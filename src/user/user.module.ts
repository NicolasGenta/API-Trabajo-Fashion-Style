import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/entities/usuario.entity';
import { Rol } from 'src/entities/rol.entity';
import { Persona } from 'src/entities/persona.entity';
import { Cliente } from 'src/entities/cliente.entity';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Rubro } from 'src/entities/rubro.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol, Persona, Cliente, Emprendimiento, Rubro]),
  forwardRef(() => AuthModule)],

  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
