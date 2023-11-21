import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Estado } from "./estado.entity";
import { Emprendimiento } from "./emprendimiento.entity";
import { Cliente } from "./cliente.entity";

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    codigo_pedido :number;

    @OneToOne(type => Estado, estado => estado.estado_id)
    estado_id :Estado;

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @OneToOne(type => Emprendimiento, emprendimiento => emprendimiento.emprendimiento_id)
    emprendimiento_id :number;

    @Column()
    fecha_pedido :string;
}