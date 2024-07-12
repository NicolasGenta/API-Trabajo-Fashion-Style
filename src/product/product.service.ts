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
import { ImageService } from 'src/image/image.service';

@Injectable()
export class ProductService {

    constructor(
        private imageService: ImageService,
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Emprendimiento)
        private readonly emprendimientoRepository: Repository<Emprendimiento>,
        @InjectRepository(Pedido)
        private readonly pedidosRepository: Repository<Pedido>,
        private readonly entityManager: EntityManager,
    ) { }

    // 👇 CREATE
    async crearProducto(producDto: producDto, img: any) {
        try {
            let nuevoProducto;
            const { nombre, descripcion, precio, category, emprendimiento } = producDto;
            const fileName = await this.imageService.uploadImage(img);
            await this.categoryRepository.manager.transaction(async (manager) => {
                const categoryProduct = await this.categoryRepository.findOne({ where: { categoria_id: category } });
                const emprendimientoProduct = await this.emprendimientoRepository.findOne({ where: { emprendimiento_id: emprendimiento } })
                if (!categoryProduct) throw new Error(`La categoria ${category} no existe`);
                if (!emprendimientoProduct) throw new Error(`El emprendimiento ${emprendimiento} no existe`);
                nuevoProducto = this.productRepository.create({
                    nombre_producto: nombre,
                    descripcion: descripcion,
                    precio: precio,
                    img: fileName,
                    mas_comprado: 0,
                    descuento: 1,
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

    // 👇 READ
    // Products
    async getProductoById(id: number): Promise<any> {
        try {
            const productForId = await this.productRepository
                .createQueryBuilder("products")
                .innerJoinAndSelect("products.category", "category")
                .innerJoinAndSelect("products.emprendimiento", "emprendimiento")
                .where(`products.codigo_producto = ${id}`)
                .getMany()

            return productForId
        } catch (err) {
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
        } catch (err) {
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }

    async getProductsByEmprendimientoId(id: number) {
        console.log('id:', id);

        let productos = [];
        const products = await this.productRepository
            .createQueryBuilder("p")
            .select([
                'p.codigo_producto as codigo',
                'p.nombre_producto as nombre',
                'p.descripcion as descripcion',
                'p.precio as precio',
                'p.img as img',
                'c.categoria_id as categoria'
            ])
            .innerJoin("p.category", "c")
            .innerJoin("p.emprendimiento", "e")
            .where("p.emprendimiento_id = :id", { id })
            .getRawMany();

        return products;
    }

    //Others
    async getCategories(): Promise<Category[]> {
        try {
            const categories = await this.categoryRepository.find()
            console.log(categories);
            if (!categories) throw new Error('Ha sucedido un error')
            return categories;
        } catch (err) {
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }

    async getMaxPrecio() {
        try {
            const maxPrecio = await this.productRepository
                .createQueryBuilder('producto')
                .select("MAX(producto.precio)", "maxPrecio")
                .getRawOne();

            return maxPrecio;
        } catch (error) {
            console.error(`Error al obtener el precio máximo: ${error.message}`);
            throw new Error(error)
        }
    }

    //👇 UPDATE
    async putProductos(id: number, body: any, imagen: any) {
        try {
            const { nombre, descripcion, precio, category, emprendimiento, img } = body;
            const productoExistente = await this.productRepository.findOne({ where: { codigo_producto: id } })
            if (!productoExistente) throw new NotFoundException(`No se encontró un producto con el id ${id}`)

            await this.productRepository.manager.transaction(async (manager) => {
                let fileName : string;
                if(imagen) {
                    const imgName = productoExistente.img;
                    this.imageService.deleteImage(imgName);
                    fileName = this.imageService.uploadImage(imagen);
                } else {
                    fileName = img
                }

                Object.assign(productoExistente, { nombre_producto: nombre, descripcion, precio, img: fileName })
                if (category) {
                    const categoryProduct = await this.categoryRepository.findOne({ where: { categoria_id: category } });
                    productoExistente.category = categoryProduct;
                }

                if (emprendimiento) {
                    const emprendimientoProduct = await this.emprendimientoRepository.findOne({ where: { emprendimiento_id: emprendimiento } });
                    productoExistente.emprendimiento = emprendimientoProduct;
                }
                
                await this.productRepository.save(productoExistente);
                return productoExistente;
            })

        } catch (error) {
            throw new Error('No se pudo actualizar el recurso')
        }
    }

    //👇 DELETE
    async deleteProductos(id: number) {
        try {
            const productoExistente = await this.productRepository.findOne({ where: { codigo_producto: id } });
            if (!productoExistente) throw new NotFoundException(`No se encontro el producto con el id ${id}`);
            const fileName = productoExistente.img;
            await this.imageService.deleteImage(fileName);
            await this.productRepository.remove(productoExistente);
            return { mensaje: 'El producto ha sido eliminado con exito' }
        } catch (err) {
            throw new Error(`No se pudo eliminar el recurso: ${err.message}`);
        }
    }

}