import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../domain/services/app.service';
import { EventPattern } from '@nestjs/microservices';
import { RabbitService } from '../../domain/services/rabbit.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitService: RabbitService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send-message')
  sendMessage() {
    return this.rabbitService.sendHello();
  }

  @EventPattern('hello_rabbit')
  handleRabbitMessage(data: any) {
    console.log('📨 Message from RabbitMQ:', data);
  }
}
