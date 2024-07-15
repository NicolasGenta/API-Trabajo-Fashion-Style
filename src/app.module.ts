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
import { MailModule } from './mail/mail.module';
import { EstadoModule } from './product/pedidos/modulos/estado.module';
import { ClienteModule } from './product/pedidos/modulos/cliente.module';
import { PedidoModule } from './product/pedidos/modulos/pedidos.module';
import { MessagesModule } from './messages/messages.module';

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
    synchronize: false
  }),
ProductModule,
UserModule,
EmprendimientoModule,
AuthModule,
ImageModule,
MailModule,
EstadoModule,
ClienteModule,
PedidoModule,
MessagesModule,
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
