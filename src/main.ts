import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }),
  );
  app.enableCors({
    origin: 'https://emprende-aa122.web.app/',
    methods: 'GET, PUT, POST, DELETE'
  })
  // app.use(cookieParser())
  await app.listen(8080);
}
bootstrap();
