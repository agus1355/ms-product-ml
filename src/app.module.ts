import { Module} from '@nestjs/common';
import { ProductModule } from './infrastructure/inversion-of-control/product.module';
import { ReviewModule } from './infrastructure/inversion-of-control/review.module';
import { OfferModule } from './infrastructure/inversion-of-control/offer.module';
import { setEnvironment } from './infrastructure/enviroments';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: setEnvironment()
    }),
    ProductModule,
    ReviewModule,
    OfferModule,
  ],
})
export class AppModule {}
