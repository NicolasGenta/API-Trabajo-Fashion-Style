import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('eventos')
export class Events {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre_evento: string;

    @Column()
    descripcion: string;

    @Column()
    fecha_inicio: string;

    @Column()
    fecha_fin: string;

    @Column()
    lugar: string

    @Column()
    geom: string;

}