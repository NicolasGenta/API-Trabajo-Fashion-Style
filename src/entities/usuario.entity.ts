import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Persona } from "./persona.entity";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    usuario_id :number;

    @Column()
    password :string;

    @Column({name: 'persona_id'})
    @OneToOne((type) => Persona, (persona) => persona.persona_id)
    @JoinColumn({name: 'persona_id'})
    persona : Persona;
    
    @OneToOne(type => Rol, rol => rol.rol_id)
    @JoinColumn({name: 'rol_id'})
    rol_id : Rol;

    @Column()
    mail :string

}