import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity('estado')
export class Estado {
    @PrimaryGeneratedColumn()
    estado_id :number;

    @Column()
    nombre_estado :string;

    @ManyToOne(type => Pedido, pedido =>pedido.estado)
    @JoinColumn({name: 'codigo_pedido'})
    pedidos: Pedido[];
}