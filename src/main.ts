import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Config } from './config';
import { ValidationError } from 'class-validator';
import * as process from 'process';

function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('Micro Bank')
    .setDescription('This is example micro bank')
    .setVersion('1.0')
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const error = validationErrors.map((item) => {
          return {
            [item.property]: Object.values(item.constraints),
          };
        });

        return new BadRequestException(error);
      },
    }),
  );

  setupSwagger(app);
  console.log(
    'Micro Bank is running on port',
    process.env.PORT,
    process.env.STAGE,
  );
  await app.listen(process.env.PORT);
}
bootstrap();
