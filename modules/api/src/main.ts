import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const options = new DocumentBuilder()
    .setTitle('No More Missing Eggs: The API')
    .setDescription('This API provides the backbone of the NMME project')
    .setVersion('1.0')
    .addTag('Authentication')
    .addTag('Carton')
    .addTag('Category')
    .addTag('Item')
    .addTag('Kitchen')
    .addTag('Membership')
    .addTag('User')
    .addTag('General')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
