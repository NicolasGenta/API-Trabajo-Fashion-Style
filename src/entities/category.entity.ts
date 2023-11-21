import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./product.entity";

@Entity('categoria')
export class Category {

    @PrimaryGeneratedColumn()
    categoria_id : number;

    @Column()
    nombre_categoria :string;

    @OneToMany((type) => Products, (product) => product.category)
    products: Products[];
    
}