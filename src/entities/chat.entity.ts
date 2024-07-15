import { Entity, Column, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Mensajes } from "./mensajes.entity";
@Entity('chat')
export class Chat {

    @PrimaryGeneratedColumn()
    idChat : number;

    @OneToOne(() => Usuario, usuario => usuario.usuario_id)
    @JoinColumn({name: 'user_1'})
    usuario_1 : Usuario;

    @OneToOne(() => Usuario, usuario => usuario.usuario_id)
    @JoinColumn({name: 'user_2'})
    usuario_2 : Usuario;

    @OneToMany(type => Mensajes, mensajes => mensajes.chat)
    mensajes :Mensajes[];
}