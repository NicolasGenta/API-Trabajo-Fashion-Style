import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./category.entity";
import { Emprendimiento } from "./emprendimiento.entity";

@Entity('producto')
export class Products {

    @PrimaryGeneratedColumn()
    codigo_producto: number;

    @Column()
    nombre_producto: string;

    @Column()
    descripcion: string;

    @Column({type: "double"})
    precio: number;

    @Column({type: "tinyint"})
    mas_comprado : number;

    @Column({type: "tinyint"})
    descuento : number;

    @Column()
    img :string;

    @ManyToOne((type) => Category, (category) => category.products)
    @JoinColumn({name: 'categoria_id'})
    category : Category; 

    @ManyToOne(type=> Emprendimiento, emprendimiento => emprendimiento.emprendimiento_id)
    @JoinColumn({name: 'emprendimiento_id'})
    emprendimiento : Emprendimiento
}