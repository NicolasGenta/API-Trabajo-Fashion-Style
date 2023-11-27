import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Products } from "./product.entity";

@Entity('pedido_detalle')
export class Pedido_detalle {
    @PrimaryGeneratedColumn()
    pedido_detalle_id :number;

    @ManyToOne(type => Pedido, pedido => pedido.pedidoDetalle)
    @JoinColumn({ name: 'pedido_id' })  
    pedido: Pedido;

    @OneToOne(type => Products, producto => producto.codigo_producto)
    @JoinColumn({ name: 'codigo_producto' })  
    producto :Products;

    @Column()
    cantidad: number;
}