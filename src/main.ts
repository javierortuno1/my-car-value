import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use();
  // Apply the pipe for any incomming request to the instance app
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('My Car Value Api')
    .setDescription('The My Car Value API description')
    .setVersion('1.0')
    .addTag('myCarValue')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
