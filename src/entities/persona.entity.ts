import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('persona')
export class Persona {
    @PrimaryGeneratedColumn()
    persona_id :number;

    @Column()
    last_name :string;

    @Column()
    first_name :string;

}