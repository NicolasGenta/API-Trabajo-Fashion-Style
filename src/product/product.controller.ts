import { Controller, Get, Param, Post, Body, Res, HttpStatus, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { producDto } from './producto.dto';
import { Products } from '../entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { producUpdateDto } from './productUpdate.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';



@Controller('/productos')
export class ProductController {
    constructor(private readonly productoService: ProductService) {}

    @Get()
    async getProducto(@Res() response): Promise<Products[]> {
        try {
            const responseFromService = await this.productoService.getProductos();
            if (responseFromService) {
                return response.status(HttpStatus.OK).json(responseFromService);
            }
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ error: `${error}` });
        }
    }

    @Get('/categorias')
    async getCategorias(@Res() response): Promise<Category[]> {
        try {
            const responseFromService = await this.productoService.getCategories();
            if (responseFromService) {
                return response.status(HttpStatus.OK).json(responseFromService);
            }
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ error: `Error al obtener categorías: ${error.message}` });
        }
    }

    @Get('/maxPrecio')
    async getMaxPrecio(@Res() response): Promise<number> {
        try {
            const responseFromService = await this.productoService.getMaxPrecio();
            if (responseFromService) {
                return response.status(HttpStatus.OK).json(responseFromService);
            }
        } catch (error) {
            return response.status(HttpStatus.NOT_FOUND).json({ error: `Error al obtener categorías: ${error.message}` });
        }
    }
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    @Delete('/:id')
    async deleteProductos(@Param('id') id: number, @Res() res) {
        try {
            await this.productoService.deleteProductos(id);
            res.status(HttpStatus.OK).json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json({ error: error });
        }
    }

    @Get("/:id")
    async getProductoById(@Res() response, @Param("id") id: number): Promise<Products> {
        try {
            const resposeFromService = await this.productoService.getProductoById(id);
            if (resposeFromService) {
                return response.status(HttpStatus.OK).json(resposeFromService);
            }
        } catch (err) {
            return response.status(HttpStatus.NOT_FOUND).json({ error: "dsfghjh" });
        }
    }

    
    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    async crearProducto(@Res() response, @Body() producDto: producDto) {
        console.log(producDto)
        try {
            const responseFromService = await this.productoService.crearProducto(producDto);
            if (responseFromService) {
                return response.status(HttpStatus.CREATED).json({ message: 'El recurso ha sido creado con éxito' });
            }
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({ error: `El recurso no pudo ser creado. ${error}` });
        }
    }
    

    @Put('/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Emprendedor')
    async putProductos(@Param('id') id: number, @Body() body: producUpdateDto, @Res() res): Promise<void> {
        try {
            await this.productoService.putProductos(id, body);
            res.status(HttpStatus.OK).json({ message: 'Producto modificado correctamente' });
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json({ error: `No se pudo encontrar el producto` });
        }
    }
}
