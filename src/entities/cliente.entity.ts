import { Entity, Column, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";
import { Usuario } from "./usuario.entity";

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    cliente_id : number;

    @OneToOne(() => Usuario, usuario => usuario.usuario_id)
    @JoinColumn({name: 'user_id'})
    user: Usuario;

    @OneToMany(()=> Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];
}