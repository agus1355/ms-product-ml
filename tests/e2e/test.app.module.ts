import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { setEnvironment } from 'src/infrastructure/enviroments';
import { OfferModule } from 'src/infrastructure/inversion-of-control/offer.module';
import { ProductModule } from 'src/infrastructure/inversion-of-control/product.module';
import { ReviewModule } from 'src/infrastructure/inversion-of-control/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: setEnvironment(),
    }),
    ProductModule,
    ReviewModule,
    OfferModule
  ],
})
export class TestAppModule {}
