import { Column, Entity, OneToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { Rubro } from "./rubro.entity";
import { Products } from "./product.entity";
import { Usuario } from "./usuario.entity";
import { Pedido } from "./pedido.entity";
import { IsEmail } from "class-validator";

@Entity('emprendimiento')
export class Emprendimiento {
    @PrimaryGeneratedColumn()
    emprendimiento_id :number;

    @Column()
    razon_social :string;

    @ManyToOne(() => Rubro, rubro => rubro.emprendimientos)
    @JoinColumn({ name: 'rubro_id' }) // JoinColumn aquí para la clave foránea
    rubro: Rubro; // Cambié rubro_id a rubro

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