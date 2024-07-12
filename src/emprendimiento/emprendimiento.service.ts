import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Products } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { emprendimientoUdpatedDto } from './empUdpate.dto';
import { Rubro } from 'src/entities/rubro.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { RubroDto } from './dto/rubro.dto';
import { CategoryDTO } from './dto/categoria.dato';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class EmprendimientoService {

    constructor(
        @InjectRepository(Emprendimiento)
        private readonly emprendimientoRespository: Repository<Emprendimiento>,
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Rubro)
        private readonly rubroRepository: Repository<Rubro>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async getEmprendimientos() {
        try {
            const emprendimientos = await this.emprendimientoRespository
                .createQueryBuilder('e')
                .select([
                    'e.emprendimiento_id as id',
                    'e.razon_social as nombre',
                    'CASE WHEN e.estado = 1 THEN "Activo" WHEN e.estado = 0 THEN "Inactivo" END AS estado',
                    'e.estado AS estado_id',
                    'r.rubro_id as rubro_id',
                    'r.nombre_rubro as rubro',
                    'concat(p.last_name, " ", p.first_name) as responsable',
                    'p.documento as documento'
                ])
                .innerJoin('e.rubro', 'r')
                .innerJoin('e.usuario', 'u')
                .innerJoin('u.persona', 'p')
            if (!emprendimientos) throw new Error('Ha sucedido un error')

            const result = await emprendimientos.getRawMany();
            return result;
        } catch (err) {
            console.log(err);

            throw new Error(`${err}`)
        }
    }

    async getEmprendimientoById(id: number) {
        try {
            const emprendimiento = await this.emprendimientoRespository.findOne({ where: { emprendimiento_id: id } });
            if (!emprendimiento) throw new NotFoundException(`No se encontró un emprendimiento con el id ${id}`)
            return emprendimiento;
        } catch (err) {
            throw new Error(err)
        }
    }

    // async getProductosByEmprendimiento(idUsuario: number) {
    //     try {
    //         const queryBuilder = this.productRepository
    //             .createQueryBuilder('producto')
    //             .select([
    //                 'codigo_producto as ID',
    //                 'nombre_producto as Producto',
    //                 'descripcion as Descripción',
    //                 'precio as Precio',
    //                 'img as Imagen',
    //                 // 'nombre_categoria as Categoria'
    //             ])
    //             .innerJoinAndSelect('producto.category', 'category')
    //             .innerJoin('producto.emprendimiento', 'emprendimiento')
    //             .innerJoin('emprendimiento.usuario', 'u')
    //             .where('u.usuario_id = :idUsuario', { idUsuario });

    //         const result = await queryBuilder.getRawMany();
    //         return result;
    //     } catch (error) {
    //         throw new Error(`Error al obtener productos por mail: ${error.message}`);
    //     }
    // }

    async getEmprendimientoByUserId(id: number) {
        console.log(id);

        try {
            const emprendimiento = await this.emprendimientoRespository
                .createQueryBuilder('e')
                .select([
                    'e.emprendimiento_id as id',
                    'e.razon_social as razon_social',
                    'r.rubro_id as rubro_id',
                    'e.estado as estado',
                    'e.calle as calle',
                    'e.nro as nro',
                    'e.calle_1 as calle_1',
                    'e.calle_2 as calle_2'
                ])
                .innerJoin('e.usuario', 'u')
                .innerJoin('e.rubro', 'r')
                .where('u.usuario_id = :id', { id })
                .getRawOne();

            if (!emprendimiento) throw new Error('NOT FOUND')

            return emprendimiento;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRubros() {
        try {
            const rubros = await this.rubroRepository
                .createQueryBuilder('rubro')
                .select([
                    'rubro_id as id',
                    'nombre_rubro as nombre'
                ]);
            if (!rubros) throw new Error('Ha sucedido un error')

            const result = await rubros.getRawMany();

            return result;
        } catch (error) {

        }
    }

    //👇 POST
    async createEmprendimiento(emprendimiento) {
        try {
            let nuevoEmprendimiento;
            const { razon_social, rubro_id, usuario_id, calle, nro, calle_1, calle_2 } = emprendimiento;


            await this.emprendimientoRespository.manager.transaction(async (manager) => {
                const usuario = await this.usuarioRepository.findOne({ where: { usuario_id: usuario_id } });

                const rubro = await this.rubroRepository.findOne({ where: { rubro_id: rubro_id } });
                nuevoEmprendimiento = this.emprendimientoRespository.create({
                    razon_social: razon_social,
                    rubro: rubro,
                    usuario: usuario,
                    estado: false,
                    calle,
                    nro,
                    calle_1,
                    calle_2
                });

                await this.emprendimientoRespository.save(nuevoEmprendimiento)
            });

            return nuevoEmprendimiento
        } catch (error) {

        }
    }

    //👇 UPDATE
    async updateEmprendimientoStatus(emprendimiento: emprendimientoUdpatedDto) {
        try {
            const { id, estado_id } = emprendimiento;
            const emprendimientoExistente = await this.emprendimientoRespository.findOne({ where: { emprendimiento_id: id } })
            if (!emprendimientoExistente) throw new NotFoundException(`No se encontró un producto con el id ${id}`)
            if (emprendimientoExistente.estado !== Boolean(estado_id)) {
                emprendimientoExistente.estado = Boolean(estado_id);
                await this.emprendimientoRespository.save(emprendimientoExistente);
            }
            else throw new NotFoundException(`El emprendimiento ya tiene ese estado asignado`)
            return emprendimientoExistente;
        } catch (err) {
            console.log(err);

            throw new Error(err)
        }
    }

    async updateEmprendimiento(id: number, emprendimiento) {
        try {
            const { razon_social, rubro_id, estado, calle, nro, calle_1, calle_2 } = emprendimiento;

            const emprendimientoExistente = await this.emprendimientoRespository.findOne({ where: { emprendimiento_id: id } });
            if (!emprendimientoExistente) throw new NotFoundException(`No se encontró un emprendimiento con el id ${id}`)
            const rubro = await this.rubroRepository.findOne({ where: { rubro_id: rubro_id } })
            Object.assign(emprendimientoExistente, { razon_social: razon_social, rubro: rubro, estado, calle, nro, calle_1, calle_2 });
            await this.emprendimientoRespository.save(emprendimientoExistente)

            return emprendimientoExistente

        } catch (error) {
            console.log(error);

        }
    }

    async crearRubro(rubro: RubroDto) {
        try {
            const { nombre_rubro } = rubro;

            rubro = this.rubroRepository.create({
                nombre_rubro: nombre_rubro
            })
            await this.rubroRepository.save(rubro);

            return nombre_rubro;
        } catch (error) {

        }
    }

    async crearCategoria(categoria: CategoryDTO) {
        try {
            const {nombre_categoria} = categoria;

            categoria = this.categoryRepository.create({
                nombre_categoria: nombre_categoria
            });

            await this.categoryRepository.save(categoria)

            return categoria
        } catch (error) {
            console.log(error);
            
        }
    }
}
