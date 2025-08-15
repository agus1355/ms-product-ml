import { Module} from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { AppService } from './domain/services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitService } from './domain/services/rabbit.service';
import { AppDataSource } from './infrastructure/database/data-source';
import { SeedModule } from './infrastructure/inversion-of-control/seed.module';
import { ProductModule } from './infrastructure/inversion-of-control/product.module';
import { ReviewModule } from './infrastructure/inversion-of-control/review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    SeedModule,
    ProductModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService, RabbitService],
})
export class AppModule {}
