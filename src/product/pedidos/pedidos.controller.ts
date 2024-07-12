import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './pedidos.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  generarPedidos(@Body() input: CreatePedidoDto) {
    return this.pedidosService.generarPedidos(input);
  }

  @Get('cliente/:id')
  getPedidoByCliente(@Param('id') id: number) {
    return this.pedidosService.getPedidoByCliente(id);
  }

  @Get('emprendimiento/:id')
  getPedidoByEmprendimiento(@Param('id') id: number) {
    return this.pedidosService.getPedidoByEmprendimiento(id);
  }
}

