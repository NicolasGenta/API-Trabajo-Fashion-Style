import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from 'src/entities/pedido.entity';
import { Pedido_detalle } from 'src/entities/pedido_detalle.entity';
import { EstadoModule } from './estado.module';
import { ClienteModule } from './cliente.module';
import { PedidosController } from '../pedidos.controller';
import { PedidosService } from '../pedidos.service';
import { Products } from 'src/entities/product.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Pedido_detalle, Products]),
    EstadoModule,
    ClienteModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidoModule {}


