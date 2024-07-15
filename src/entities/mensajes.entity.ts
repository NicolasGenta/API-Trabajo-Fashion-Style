import { Entity, Column, JoinColumn, OneToMany,ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Chat } from "./chat.entity";

@Entity('mensajes')
export class Mensajes {

    @PrimaryGeneratedColumn()
    idMensajes :number;

    @ManyToOne(type=> Chat, chat => chat.idChat)
    @JoinColumn({name: 'idChat'})
    chat : Chat;

    @Column()
    mensaje :string;

    @OneToOne(() => Usuario, usuario => usuario.usuario_id)
    @JoinColumn({name: 'idUsuario'})
    usuario : Usuario;
}