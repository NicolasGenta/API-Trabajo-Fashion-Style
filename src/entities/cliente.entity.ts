import { Entity, Column, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Usuario } from "./usuario.entity";

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    cliente_id : number;

    @OneToOne(type => Usuario, usuario => usuario.cliente)
    @JoinColumn({name: 'user_id'})
    user: Usuario;

    @OneToMany(type=> Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];
}