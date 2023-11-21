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
        // @InjectRepository(Estado)
        // private readonly categoryRepository : Repository<Estado>,
        // @InjectRepository(Cliente)
        // private readonly emprendimientoRepository : Repository<Cliente>,
        // @InjectRepository(Products)
        // private readonly pedidosRepository: Repository<Pedido>,
        ){}

    //     async getPedidoByCliente(id: number) {
    //     try{
    //         const pedidos = await this.pedidosRepository
    //         .createQueryBuilder('p')
    //         .select(['p.codigo_pedido', 'e.nombre_estado', 'em.razon_social', 'p.fecha_pedido'])
    //         .innerJoinAndSelect('p.emprendimiento', 'em')  // Incluye la relación con Emprendimiento
    //         .innerJoinAndSelect('p.estado', 'e')          // Incluye la relación con Estado
    //         .innerJoinAndSelect('p.cliente', 'c')         // Incluye la relación con Cliente
    //         .where('c.cliente_id = :id', { id })         // Filtro por ID de Cliente
    //         .getRawMany();

    //         return pedidos
    //     }catch(err){
    //         throw new Error(`Error al obtener los datos: ${err.message}`)
    //     }
    // }
}
