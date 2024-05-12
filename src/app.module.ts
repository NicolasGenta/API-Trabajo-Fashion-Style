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


@Module({
  imports: [ServeStaticModule.forRoot({rootPath: join(__dirname,'..','client')}), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin01',
    password: 'ln40065375',
    database: 'emprende',
    autoLoadEntities: true
  }),
ProductModule,
UserModule,
EmprendimientoModule,
AuthModule,
ImageModule
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
