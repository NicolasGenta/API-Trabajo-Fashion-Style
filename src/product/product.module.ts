import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Emprendimiento } from '../entities/emprendimiento.entity';
import { Rubro } from '../entities/rubro.entity';
import { PedidosService } from 'src/product/pedidos/pedidos.service';
import { PedidosController } from 'src/product/pedidos/pedidos.controller';
import { Usuario } from 'src/entities/usuario.entity';
import { Estado } from 'src/entities/estado.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Pedido_detalle } from 'src/entities/pedido_detalle.entity';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { Persona } from 'src/entities/persona.entity';

@Module({
    imports: [ImageModule, TypeOrmModule.forFeature([Products, Category, Emprendimiento, Rubro, Usuario,
    Cliente, Estado, Pedido, Pedido_detalle, Persona])],
    providers: [ProductService, PedidosService],
    controllers: [ProductController, PedidosController]
})
export class ProductModule {}
