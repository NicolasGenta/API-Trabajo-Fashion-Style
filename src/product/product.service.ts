import { Injectable, NotFoundException } from '@nestjs/common';
import { producDto } from './producto.dto';
import { EntityManager, Repository } from 'typeorm';
import { Products } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { producUpdateDto } from './productUpdate.dto';
import { writeFile } from 'fs';
import * as path from 'path';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Category)
        private readonly categoryRepository : Repository<Category>,
        @InjectRepository(Emprendimiento)
        private readonly emprendimientoRepository : Repository<Emprendimiento>,
        @InjectRepository(Products)
        private readonly pedidosRepository: Repository<Pedido>,
        private readonly entityManager : EntityManager
    ){}

    async crearProducto(producDto: producDto) {
        try {
            let nuevoProducto;
            const { nombre, descripcion, precio, img, category, emprendimiento } = producDto;
            await this.categoryRepository.manager.transaction( async (manager) => {

                const categoryProduct = await this.categoryRepository.findOne({where: {nombre_categoria: category}});
                const emprendimientoProduct = await this.emprendimientoRepository.findOne({where:{emprendimiento_id: emprendimiento}})
                
                if(!categoryProduct) throw new Error(`La categoria ${category} no existe`);
                if(!emprendimientoProduct) throw new Error(`El emprendimiento ${emprendimiento} no existe`)
    
                nuevoProducto = this.productRepository.create({
                    nombre_producto: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    img: img,
                    category: categoryProduct,
                    emprendimiento: emprendimientoProduct
                });
    
                await this.productRepository.save(nuevoProducto);
            })

            return nuevoProducto;
        } catch (error) {
            throw new Error(`Se ha producido un error: ${error}`);
        }
    }

    async getProductoById(id : number): Promise <any> {
        try{
            const productForId = await this.productRepository
            .createQueryBuilder("products")
            .innerJoinAndSelect("products.category", "category")
            .innerJoinAndSelect("products.emprendimiento", "emprendimiento")
            .where(`products.codigo_producto = ${id}`)
            .getMany()

            return productForId
        } catch(err) {
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }

    async getProductos(): Promise<Products[]> {
        try {
            const productsWithCategories = await this.productRepository
            .createQueryBuilder("products")
            .innerJoinAndSelect("products.category", "category")
            .innerJoinAndSelect("products.emprendimiento", "emprendimiento")
            .getMany();
            return productsWithCategories;
        }catch(err){
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }

    async deleteProductos(id:number){
        try{
            const productoExistente = await this.productRepository.find({where:{codigo_producto: id}});
            if(!productoExistente) throw new NotFoundException(`No se encontro el producto con el id ${id}`);
            await this.productRepository.remove(productoExistente);
            return {mensaje: 'El producto ha sido eliminado con exito'}
        }catch (err) {
            throw new Error (`No se pudo eliminar el recurso: ${err.message}`);
        }
    } 

    async putProductos(id:number, body:producUpdateDto){
        try{
            const { nombre, descripcion, precio, img, category, emprendimiento } = body; 
            const productoExistente = await this.productRepository.findOne({where: {codigo_producto: id}})
            if(!productoExistente) throw new NotFoundException(`No se encontró un producto con el id ${id}`)

            Object.assign(productoExistente, {nombre, descripcion, precio, img } )
            if (category) {
                const categoryProduct = await this.categoryRepository.findOne({ where: { nombre_categoria: category } });
                productoExistente.category = categoryProduct;
            }
        
            if (emprendimiento) {
                const emprendimientoProduct = await this.emprendimientoRepository.findOne({ where: { emprendimiento_id: emprendimiento } });
                productoExistente.emprendimiento = emprendimientoProduct;
            }

            await this.productRepository.save(productoExistente);
            return productoExistente;
        }catch (err){
            throw new Error ('No se pudo actualizar el recurso')
        }
    }

    async getProductsByEmprendimientoId (emprendimientoId: number){
        const emprendimiento = await this.emprendimientoRepository.findOne({where:{emprendimiento_id: emprendimientoId}})

        if(!emprendimiento) throw new Error('Emprendimiento no encontrado');

        const productosPorEmprendimiento = await this.productRepository
            .createQueryBuilder("products")
            .innerJoinAndSelect("products.category", "category")
            .innerJoinAndSelect("products.emprendimiento", "emprendimiento")
            .andWhere(`emprendimiento.emprendimiento_id = :emprendimientoId`, {emprendimientoId : emprendimientoId})
            .getMany();
            return productosPorEmprendimiento;
    }   

    async getCategories(): Promise<Category[]> {
        try {
            const categories = await this.categoryRepository.find()
            console.log(categories);
            if(!categories) throw new Error ('Ha sucedido un error')
            return categories;
        }catch(err){
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }

    async getMaxPrecio(){
        try {
            const maxPrecio = await this.productRepository
            .createQueryBuilder('producto')
            .select("MAX(producto.precio)", "maxPrecio")
            .getRawOne();

            return maxPrecio;
        }catch (error) {
            console.error(`Error al obtener el precio máximo: ${error.message}`);
            throw new Error(error)
        }
    }

    async createNewProduct(producDto : producDto) {
        /* 
        - Obtener las propiedades nombre, descripción, precio, img, category, emprendimiento;
        - Pasar img base64 a un archivo con fs
        - Generar id único para el archivo
        - Guardar img en la carpeta ./src/private con el id como nombre
        - Guardar el resto de las propiedades más el id de la imagen en la DB
        */
        try {
            const { nombre, descripcion, precio, img, category, emprendimiento } = producDto;

        } catch (error) {
            
        }

    }

}