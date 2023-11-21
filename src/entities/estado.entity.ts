import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estado')
export class Estado {
    @PrimaryGeneratedColumn()
    estado_id :number;

    @Column()
    nombre_estado :string;
}