import { Controller, Get, Param, Post, Body, HttpCode, Res, HttpStatus} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.interface';
import { response } from 'express';

@Controller('/productos')
export class ProductoController {
    constructor(private readonly productoService: ProductoService){}

@Get()
async getProducto(@Res() response) :Promise <Producto[]>{
    const responseFromService = await this.productoService.getProducto();
    if(Object.keys(responseFromService).length){
        return response.status(HttpStatus.OK)
        }else{
            return response.status(HttpStatus.NOT_FOUND).json({
                message:"productos no encontrado",
            })
}
}
@Get("/:id")
async getProductoById(@Res() response, @Param("id") id:number){
    const responseFromService = await this.productoService.getProductoById(id);
    if(Object.keys(responseFromService).length){
        return response.status(HttpStatus.OK)
        }else{
            return response.status(HttpStatus.NOT_FOUND).json({
                message:"producto no encontrado",
            })

    }
}
@Post()
async crearProducto(@Res() response, @Body() body): Promise <Producto>{
    const responseFromService = await this.productoService.crearProducto(body);
    if(Object.keys(responseFromService).length){
        return response.status(HttpStatus.OK)

    }else{

        return response.status(HttpStatus.BAD_REQUEST).json({
            message: "esta mal"
          })
}
}}
