import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Estado } from "./estado.entity";
import { Emprendimiento } from "./emprendimiento.entity";
import { Cliente } from "./cliente.entity";
import { Pedido_detalle } from "./pedido_detalle.entity";

@Entity('pedido')
export class Pedido {
    @PrimaryGeneratedColumn()
    codigo_pedido :number;

    @OneToOne(type => Estado, estado => estado.pedidos)
    @JoinColumn({name: 'estado_id'})
    estado :Estado;

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    @JoinColumn({name: 'cliente_id'})
    cliente: Cliente;

    @OneToOne(type => Emprendimiento, emprendimiento => emprendimiento.pedido)
    @JoinColumn({ name: 'emprendimiento_id' })
    emprendimiento: Emprendimiento;

    @Column()
    fecha_pedido :string;

    @OneToMany(type => Pedido_detalle, pedido_detalle => pedido_detalle.pedido)
    pedidoDetalle: Pedido_detalle[];
}