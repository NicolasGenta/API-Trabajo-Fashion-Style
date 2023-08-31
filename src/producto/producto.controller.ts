import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.interface';

@Controller('/productos')
export class ProductoController {
    constructor(private readonly productoService: ProductoService){}

@Get()
getProducto() :Promise <Producto[]>{
    return this.productoService.getProducto();
}
@Get("/:id")
getProductoById(@Param("id") id:number){
    return this.productoService.getProductoById(id);
}
@Post()
crearProducto(@Body() body): Promise <Producto>{
    return this.productoService.crearProducto(body);
}
}
