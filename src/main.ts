import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './infrastructure/rest/logger.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/rest/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Backend API for getting products, offers, and reviews')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();