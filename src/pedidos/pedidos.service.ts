import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Estado } from 'src/entities/estado.entity';

@Injectable()
export class PedidosService {
    constructor(
        @InjectRepository(Estado)
        private readonly categoryRepository : Repository<Estado>,
        @InjectRepository(Cliente)
        private readonly emprendimientoRepository : Repository<Cliente>,
        @InjectRepository(Pedido)
        private readonly pedidosRepository: Repository<Pedido>,
        ){}

        async getPedidoByCliente(id: number) {
        try{
            const pedidos = await this.pedidosRepository
            .createQueryBuilder('p')
            .select(['p.codigo_pedido AS pedido',
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
            .where('c.cliente_id = :id', { id })
            .getRawMany();

            return pedidos
        }catch(err){
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }

    async getPedidoByEmprendimiento(id: number) {
        try{
            const pedidos = await this.pedidosRepository
            .createQueryBuilder('p')
            .select(['p.codigo_pedido AS pedido',
            'p.fecha_pedido AS fecha',
            'e.nombre_estado AS estado',
            'u.mail AS email',
            'per.first_name AS nombre',
            'per.last_name AS apellido', 
            'pdet.codigo_producto AS codigo_producto', 
            'pdet.producto',
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
            .where('em.emprendimiento_id = :id', { id })
            .getRawMany();

            return pedidos
        }catch(err){
            throw new Error(`Error al obtener los datos: ${err.message}`)
        }
    }
}
