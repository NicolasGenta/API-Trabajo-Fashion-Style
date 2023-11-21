import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

export class Cliente {
    @PrimaryGeneratedColumn()
    cliente_id : number;

    @Column()
    user_id: number;

    @OneToMany(type=> Pedido, pedido => pedido.cliente)
    pedidos: Pedido[]
}