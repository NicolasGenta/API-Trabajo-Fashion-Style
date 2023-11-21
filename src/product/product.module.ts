import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Emprendimiento } from '../entities/emprendimiento.entity';
import { Rubro } from '../entities/rubro.entity';
import { PedidosService } from 'src/pedidos/pedidos.service';
import { PedidosController } from 'src/pedidos/pedidos.controller';
import { Usuario } from 'src/entities/usuario.entity';
import { Estado } from 'src/entities/estado.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Cliente } from 'src/entities/cliente.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Products, Category, Emprendimiento, Rubro, Usuario])],
    providers: [ProductService, PedidosService],
    controllers: [ProductController, PedidosController]
})
export class ProductModule {}
