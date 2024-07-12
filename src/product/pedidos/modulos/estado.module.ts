import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from 'src/entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  exports: [TypeOrmModule],
})
export class EstadoModule {}
