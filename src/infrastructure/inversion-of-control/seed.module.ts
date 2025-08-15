import { Module } from '@nestjs/common';
import { AppService } from 'src/domain/services/app.service';
import { RabbitService } from 'src/domain/services/rabbit.service';
import { AppController } from 'src/presentation/controllers/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    /*{ provide: TOKENS.ReceivableRepository, useClass: ReceivableRepository },*/
    RabbitService,
    AppService
  ],
})
export class SeedModule {}