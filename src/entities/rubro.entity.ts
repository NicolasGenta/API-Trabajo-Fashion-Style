import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Emprendimiento } from "./emprendimiento.entity";

@Entity('rubro')
export class Rubro {
    @PrimaryGeneratedColumn()
    rubro_id : number;

    @Column()
    nombre_rubro :string;

    @ManyToOne(type => Emprendimiento, emprendimiento => emprendimiento.rubro)
    emprendimientos :Emprendimiento[];
    
}