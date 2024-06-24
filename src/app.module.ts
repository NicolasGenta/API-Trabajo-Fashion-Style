import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { EmprendimientoModule } from './emprendimiento/emprendimiento.module';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { EventosModule } from './eventos/eventos.module';
import config from './config';


@Module({
  imports: [ServeStaticModule.forRoot({rootPath: join(__dirname,'..','client')}), 
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin01',
    password: 'ln40065375',
    database: 'emprende',
    autoLoadEntities: true,
    
  }),
ProductModule,
UserModule,
EmprendimientoModule,
AuthModule,
ImageModule,
EventosModule
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
