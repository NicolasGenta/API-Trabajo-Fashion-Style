import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, Transaction, getManager } from 'typeorm';
import { Rol } from 'src/entities/rol.entity';
import { Persona } from 'src/entities/persona.entity';
import { userLoginDto } from './userLogin.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { newUserDto } from './newUser.dto';
import { udpatePasswordDto } from './updatePassword.dto';
import { Cliente } from 'src/entities/cliente.entity';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { AuthResult } from './AuthResult';
import { Rubro } from 'src/entities/rubro.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository : Repository<Usuario>,
        @InjectRepository(Emprendimiento) private readonly emprendimientoRepository: Repository<Emprendimiento>,
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
        @InjectRepository(Persona)
        private readonly personaRepository: Repository<Persona>
    ){}

    async getAuth(userLogin :userLoginDto){
        try{
            const { email, password } = userLogin;
            const result = await this.userRepository
            .createQueryBuilder('u')
            .select([
                'e.emprendimiento_id as emprendimiento_id',
                'e.razon_social as razon_social',
                'r.nombre_rubro as nombre_rubro',
                'u.usuario_id as usuario_id',
                'rl.rol_name as role_name',
                'u.mail as email',
                'p.persona_id as persona_id',
                'p.first_name as first_name',
                'p.last_name as last_name',
            ])
            .leftJoin(Emprendimiento, 'e', 'u.usuario_id = e.usuario_id')
            .leftJoin(Rubro, 'r', 'e.rubro_id = r.rubro_id')
            .innerJoin(Persona, 'p', 'p.persona_id = u.persona_id')
            .innerJoin(Rol, 'rl', 'u.rol_id = rl.rol_id')
            .andWhere('u.mail = :email', {email})
            .andWhere('u.password = :password', {password})
            .getRawOne();
            return result;
        }catch (err) {
            throw new Error (err)
        }
    }
    async createNewUser(newUser :newUserDto){
        try {
            const {type, firstName, lastName, email, password } = newUser;
            const userExists = await this.userRepository.findOne({where:{mail : email}});
            if(userExists) throw new Error('El usuario ya existe')
            const rol = await this.rolRepository.findOne({where:{rol_name : type}});
            if(!rol) throw new Error(`El rol '${type}' no existe`);

            let persona = await this.personaRepository.findOne({where:{first_name: firstName, last_name: lastName}})
            if(!persona){
                persona= new Persona();
                persona.first_name = firstName;
                persona.last_name = lastName;
                await this.personaRepository.save(persona);
            }

            const nuevoUsuario = new Usuario();
            nuevoUsuario.mail = email;
            nuevoUsuario.password = password;
            nuevoUsuario.rol_id = rol;
            nuevoUsuario.persona = persona;
            await this.userRepository.save(nuevoUsuario);

            return nuevoUsuario
        }catch (err) {
            throw new Error (err)
        }
    }

    async updatePassword(user: udpatePasswordDto) :Promise <string>{
        const {user_id, password} = user

        const userExists = await this.userRepository.findOne({where: {usuario_id: user_id}});
        if(!userExists) throw new NotFoundException(`No se ha encontrado un usuario con el id ${user_id}`)

        if(userExists.password == password) throw new Error("El usuario ya tiene asignada esa contraseña");

        userExists.password = password;

        await this.userRepository.save(userExists)
        return 'Cambio de conteseña existoso'
    }
}
