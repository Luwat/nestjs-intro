import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
/**
 * Nestjs bootstrap configuration
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuring global global pipes 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

//Configuring swagger

const config = new DocumentBuilder()
.setTitle('Nestjs Masterclass - Blog app api')
.setDescription('Use the base API URL as http://localhost:3000')
.setTermsOfService('http://localhost:3000/terms-of-service')
.setLicense('MIT', 'This software is free software')
.addServer('http://localhost:3000')
.setVersion('1.0')
.build();

// Instantiate the document

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  //enable cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
