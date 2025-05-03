import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config(); // Load environment variables from .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());
  // Enable CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? '*'  // Allow all origins in production
      : 'http://localhost:5173', // Allow localhost:5173 in development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('running on port', process.env.PORT ?? 3000);
  });
}
bootstrap();
