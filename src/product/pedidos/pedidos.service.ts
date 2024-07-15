import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from 'src/entities/estado.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Pedido } from 'src/entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  private async getPedidosByField(field: string, value: number) {
    try {
      const pedidos = await this.pedidoRepository
        .createQueryBuilder('p')
        .select([
          'p.codigo_pedido AS pedido',
          'p.fecha_pedido AS fecha',
          'em.razon_social AS emprendimiento',
          'e.nombre_estado AS estado',
          'u.mail AS email',
          'per.first_name AS nombre',
          'per.last_name AS apellido',
          'pdet.codigo_producto AS codigo_producto',
          'pdet.cantidad AS cantidad',
          'prod.nombre_producto AS producto',
          'prod.img AS img',
          'prod.precio AS precio',
          'cat.nombre_categoria AS categoria'
        ])
        .innerJoin('p.emprendimiento', 'em')
        .innerJoin('p.estado', 'e')
        .innerJoin('p.pedidoDetalle', 'pdet')
        .innerJoin('pdet.producto', 'prod')
        .innerJoin('prod.category', 'cat')
        .innerJoin('p.cliente', 'c')
        .innerJoin('c.user', 'u')
        .innerJoin('u.persona', 'per')
        .where(`${field} = :value`, { value })
        .getRawMany();

      return pedidos;
    } catch (err) {
      throw new Error(`Error al obtener los datos: ${err.message}`);
    }
  }

  async getPedidoByCliente(id: number) {
    return this.getPedidosByField('c.cliente_id', id);
  }

  async getPedidoByEmprendimiento(id: number) {
    return this.getPedidosByField('em.emprendimiento_id', id);
  }

  generarPedidos(input: any) {
    const { cliente_id, fecha_de_pedido, timestamp, detalle_compra } = input;

    const agrupadosPorEmprendimiento = detalle_compra.reduce((acc, producto) => {
      const { emprendimiento_id } = producto;
      if (!acc[emprendimiento_id]) {
        acc[emprendimiento_id] = [];
      }
      acc[emprendimiento_id].push(producto);
      return acc;
    }, {});

    const pedidos = Object.keys(agrupadosPorEmprendimiento).map(emprendimiento_id => ({
      cliente_id,
      fecha_de_pedido,
      timestamp,
      emprendimiento_id: Number(emprendimiento_id),
      detalle_compra: agrupadosPorEmprendimiento[emprendimiento_id],
    }));

    return pedidos;
  }
}

