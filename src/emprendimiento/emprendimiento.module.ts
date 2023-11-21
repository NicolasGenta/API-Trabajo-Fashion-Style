import { Module } from '@nestjs/common';
import { EmprendimientoController } from './emprendimiento.controller';
import { EmprendimientoService } from './emprendimiento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/product.entity';
import { Emprendimiento } from 'src/entities/emprendimiento.entity';
import { Usuario } from 'src/entities/usuario.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Products, Emprendimiento, Usuario])],
    controllers: [EmprendimientoController],
    providers: [EmprendimientoService]
})
export class EmprendimientoModule {}
