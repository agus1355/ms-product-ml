import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LoggerInterceptor } from './infrastructure/rest/logger.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './infrastructure/rest/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672'],
      queue: 'main_queue',
      queueOptions: { durable: false },
    },
  });

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
  console.log('🚀 App running with HTTP + RabbitMQ');
}
bootstrap();