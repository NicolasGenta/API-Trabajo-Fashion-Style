import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Products } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { emprendimientoUdpatedDto } from './empUdpate.dto';

@Injectable()
export class EmprendimientoService {

    constructor(
        @InjectRepository(Emprendimiento)
        private readonly emprendimientoRespository :Repository<Emprendimiento>,
        @InjectRepository(Products)
        private readonly productRepository :Repository<Products>
    ){}

    async updateEmprendimiento(emprendimiento : emprendimientoUdpatedDto) {
        try{
            const { id, estado } = emprendimiento; 
            const emprendimientoExistente = await this.emprendimientoRespository.findOne({where: {emprendimiento_id: id}})
            if(!emprendimientoExistente) throw new NotFoundException(`No se encontró un producto con el id ${id}`)
            if(emprendimientoExistente.estado !== Boolean(estado)){
                emprendimientoExistente.estado = Boolean(estado);
                await this.emprendimientoRespository.save(emprendimientoExistente);
            }
            else throw new NotFoundException(`El emprendimiento ya tiene ese estado asignado`)
            return emprendimientoExistente;
        }catch (err){
            throw new Error (err)
        }
    }

    async getEmprendimientos(){
        try {
            const emprendimientos = await this.emprendimientoRespository
            .createQueryBuilder('emprendimiento')
            .select([
                'emprendimiento_id as id',
                'razon_social as nombre',
                'estado as estado'
            ]);
            if(!emprendimientos) throw new Error ('Ha sucedido un error')

            const result = await emprendimientos.getRawMany();
            return result;
        }catch (err){
            throw new Error(`${err}`)
        }
    }

    async getEmprendimientoById(id: number){
        try {
            const emprendimiento = await this.emprendimientoRespository.findOne({where: {emprendimiento_id : id}});
            if(!emprendimiento) throw new NotFoundException(`No se encontró un emprendimiento con el id ${id}`)
            return emprendimiento;
        }catch(err){
            throw new Error(err)
        }
    }

    async getProductosByEmprendimiento(idUsuario: number){
        try {
            const queryBuilder = this.productRepository
                .createQueryBuilder('producto')
                .select([
                    'codigo_producto as ID',
                    'nombre_producto as Producto',
                    'descripcion as Descripción',
                    'precio as Precio',
                    'img as Imagen',
                    'nombre_categoria as Categoria'
                ])
                .innerJoin('producto.category', 'category')
                .innerJoin('producto.emprendimiento', 'emprendimiento')
                .innerJoin('emprendimiento.usuario', 'u')
                .where('u.usuario_id = :idUsuario', { idUsuario });

            const result = await queryBuilder.getRawMany();
            return result;
        } catch (error) {
            throw new Error(`Error al obtener productos por mail: ${error.message}`);
        }
    }
}
