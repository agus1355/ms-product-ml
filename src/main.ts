import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './infrastructure/rest/logger.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/rest/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();