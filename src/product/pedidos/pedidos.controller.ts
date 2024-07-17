import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './pedidos.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  generarPedidos(@Body() input) {
    return this.pedidosService.generarPedidos(input);
  }

  @Get('usuario/:id')
  getPedidoByUser(@Param('id') id: number) {
    return this.pedidosService.getPedidoByUser(id);
  }

  @Get('emprendimiento/:id')
  getPedidoByEmprendimiento(@Param('id') id: number) {
    return this.pedidosService.getPedidoByEmprendimiento(id);
  }
}

