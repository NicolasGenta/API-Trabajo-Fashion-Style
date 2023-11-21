import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rol')
export class Rol {
    @PrimaryGeneratedColumn()
    rol_id : number;

    @Column()
    rol_name : string
}