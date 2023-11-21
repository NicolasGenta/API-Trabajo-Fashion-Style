import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
    constructor(private readonly pedidosService: PedidosService) {}

    // @Get('/:clientId')
    // async getPedidosByCliente(@Res() response, @Param('clientId') id:number){
    //     try {
    //         const responseFromService = await this.pedidosService.getPedidoByCliente(id);
    //         if (responseFromService) {
    //             return response.status(HttpStatus.CREATED).json(responseFromService);
    //         }
    //     } catch (error) {
    //         return response.status(HttpStatus.BAD_REQUEST).json({ error: `${error}` });
    //     }
    // }
}
