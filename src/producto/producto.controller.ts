import { Controller, Get, Param, Post, Body, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.interface';
import { response } from 'express';

@Controller('/productos')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Get()
    async getProducto(@Res() response): Promise<Producto[]> {
        try {
            const responseFromService = await this.productoService.getProductos();
            if (Object.keys(responseFromService).length) {
                return response.status(HttpStatus.OK).json(responseFromService);
            }
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: "Products not found" });
        }
    }

    @Get("/:id")
    async getProductoById(@Res() response, @Param("id") id: number): Promise<Producto> {
        try {
            const resposeFromService = await this.productoService.getProductoById(id);
            if (Object.keys(resposeFromService).length) {
                return response.status(HttpStatus.OK).json(resposeFromService);
            }
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({ message: "Product not found" });
        }
    }
    
    @Post()
    async crearProducto(@Res() response, @Body() body): Promise<Producto> {
        try {
            const responseFromService = await this.productoService.crearProducto(body);
            if (Object.keys(responseFromService).length) {
                return response.status(HttpStatus.CREATED).json({ message: 'El recurso ha sido creado con éxito' });
            }
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ message: 'El recurso no pudo ser creado' });
        }
    }
}
