import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('DBMCI')
    .setDescription('The DBMCI description')
    .setVersion('1.0')
    .addTag('DBMCI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  let port:any  = (process.env.PORT)
  await app.listen(port|3000);
}
bootstrap();
