import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import { Rubro } from "./rubro.entity";
import { Products } from "./product.entity";
import { Usuario } from "./usuario.entity";
import { Pedido } from "./pedido.entity";

@Entity('emprendimiento')
export class Emprendimiento {
    @PrimaryGeneratedColumn()
    emprendimiento_id :number;
    @Column()
    razon_social :string;
    @OneToMany(type => Rubro, rubro => rubro.emprendimientos)
    rubro_id : Rubro
    @OneToMany(type => Products, producto => producto.emprendimiento)
    products : Products [];

    @OneToOne(type => Usuario, usuario => usuario.usuario_id)
    @JoinColumn({name: 'usuario_id'})
    usuario :Usuario

    @Column()
    estado :boolean

    @OneToMany(type => Pedido, pedido => pedido.emprendimiento)
    pedido :Pedido[];
}