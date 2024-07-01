import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { winstonDevConfig } from './utils/winston.dev.config';
import { winstonProdConfig } from './utils/winston.prod.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const loggerOptions = isProduction ? winstonProdConfig : winstonDevConfig;

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerOptions),
  });
  app.use(cookieParser());
  // Enable CORS using environment variables
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://frontend-production-f390.up.railway.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies to be sent
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Ecommerce app desarrollada por Alvaro Villena para curso de backend de coderhouse.')
    .setDescription('Api rest de ecommerce, implementada con nestjs y mongodb. Multiples funciones.')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
