import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { Config } from "./config";
import * as process from "process";

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
  setupSwagger(app);
  console.log('Micro Bank is running on port', Config.PORT, process.env.STAGE);
  await app.listen(Config.PORT);
}
bootstrap();
