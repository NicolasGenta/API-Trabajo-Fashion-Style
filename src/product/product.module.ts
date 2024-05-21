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

@Module({
    imports: [TypeOrmModule.forFeature([Products, Category, Emprendimiento, Rubro, Usuario,
    Cliente, Estado, Pedido, Pedido_detalle])],
    providers: [ProductService, PedidosService],
    controllers: [ProductController, PedidosController]
})
export class ProductModule {}
