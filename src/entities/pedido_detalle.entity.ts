import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Products } from "./product.entity";

@Entity()
export class Pedido_detalle {
    @PrimaryGeneratedColumn()
    pedido_detalle_id :number;

    @Column()
    @OneToOne(type => Pedido, pedido => pedido.codigo_pedido)
    pedido_id :number;

    @OneToOne(type => Products, producto => producto.codigo_producto)
    codigo_producto :number;

    @Column()
    cantidad: number;
}