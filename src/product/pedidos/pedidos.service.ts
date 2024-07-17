import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from 'src/entities/estado.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Products } from 'src/entities/product.entity';
import { Pedido_detalle } from 'src/entities/pedido_detalle.entity';
import { Usuario } from 'src/entities/usuario.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Emprendimiento)
    private readonly emprendimientoRepository : Repository<Emprendimiento>,
    @InjectRepository(Products)
    private readonly productosRepository : Repository<Products>,
    @InjectRepository(Pedido_detalle)
    private readonly pedidoDetalleRepository : Repository<Pedido_detalle>
  ) {}

  // private async getPedidosByField(field: string, value: number) {
  //   try {
  //     const pedidos = await this.pedidoRepository
  //       .createQueryBuilder('p')
  //       .select([
  //         'p.codigo_pedido AS pedido_nro',
  //         'p.fecha_pedido AS fecha',
  //         'e.nombre_estado AS estado',
  //         'u.mail AS email',
  //         'per.first_name AS nombre',
  //         'per.last_name AS apellido',
  //         'pdet.codigo_producto AS codigo_producto',
  //         'pdet.cantidad AS cantidad',
  //         'prod.nombre_producto AS producto',
  //         'prod.img AS img',
  //         'prod.precio AS precio',
  //         'cat.nombre_categoria AS categoria'
  //       ])
  //       .innerJoin('p.emprendimiento', 'em')
  //       .innerJoin('p.estado', 'e')
  //       .innerJoin('p.pedidoDetalle', 'pdet')
  //       .innerJoin('pdet.producto', 'prod')
  //       .innerJoin('prod.category', 'cat')
  //       .innerJoin('p.cliente', 'c')
  //       .innerJoin('c.user', 'u')
  //       .innerJoin('u.persona', 'per')
  //       // .groupBy('p.fecha_pedido')
  //       .where(`${field} = :value`, { value })
  //       .getRawMany();

  //     return pedidos;
  //   } catch (err) {
  //     throw new Error(`Error al obtener los datos: ${err.message}`);
  //   }
  // }

  private async getPedidosByField(field: string, value: number) {
    try {
      const pedidos = await this.pedidoRepository
        .createQueryBuilder('p')
        .select([
          'p.codigo_pedido AS pedido_nro',
          'p.fecha_pedido AS fecha',
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
  
      const pedidosEstructurados = pedidos.reduce((acc, curr) => {
        const pedidoExistente = acc.find(p => p.pedido_nro === curr.pedido_nro);
  
        const detallePedido = {
          codigo_producto: curr.codigo_producto,
          cantidad: curr.cantidad,
          producto: curr.producto,
          img: curr.img,
          precio: curr.precio,
          categoria: curr.categoria
        };
  
        if (pedidoExistente) {
          pedidoExistente.detalle_pedido.push(detallePedido);
        } else {
          acc.push({
            pedido_nro: curr.pedido_nro,
            fecha: curr.fecha,
            estado: curr.estado,
            email: curr.email,
            nombre: curr.nombre,
            apellido: curr.apellido,
            detalle_pedido: [detallePedido]
          });
        }
  
        return acc;
      }, []);
  
      return pedidosEstructurados;
    } catch (err) {
      throw new Error(`Error al obtener los datos: ${err.message}`);
    }
  }

  async getPedidoByUser(id: number) {
    const cliente = await this.usuarioRepository.findOne({where: {usuario_id : id}})
    console.log(cliente);
    
    return this.getPedidosByField('c.user_id', cliente.usuario_id);
  }

  async getPedidoByEmprendimiento(id: number) {
    return this.getPedidosByField('em.emprendimiento_id', id);
  }

  generarPedidos(input: any) {
    try {
      const {email, documento, fechaPedido, timestamp, detalle_compra} = input;

      const agrupadosPorEmprendimiento = detalle_compra.reduce((acc, producto) => {
        const { emprendimiento } = producto;
        const { emprendimiento_id } = emprendimiento;
        
        if (!acc[emprendimiento_id]) {
          acc[emprendimiento_id] = [];
        }
        acc[emprendimiento_id].push(producto);
        return acc;
      }, {});
      
      Object.keys(agrupadosPorEmprendimiento).map(async(emprendimiento_id) => {
        
        const cliente = await this.clienteRepository.findOne({where: {cliente_id: 1}})
        const emprendimiento = await this.emprendimientoRepository.findOne({where: {emprendimiento_id : Number(emprendimiento_id)}})
        
        const pedido = {
        cliente,
        fecha_pedido : fechaPedido,
        // timestamp,
        emprendimiento,
        detalle_compra: agrupadosPorEmprendimiento[emprendimiento_id],
      }
      const newPedido = await this.pedidoRepository.save(pedido);
      agrupadosPorEmprendimiento[emprendimiento_id].map(async (prod) => {
        const producto = await this.productosRepository.findOne({where: {codigo_producto : prod.codigo_producto}})
        const detalle = {
          pedido : newPedido,
          producto,
          cantidad : prod.quantity
        }

        await this.pedidoDetalleRepository.save(detalle)
      })
    });
    } catch (error) {
      
    }
  



    // return pedidos;
  }
}

