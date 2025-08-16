import { Module } from '@nestjs/common';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { ProductController } from 'src/presentation/controllers/product.controller';
import { TOKENS } from 'src/application/tokens';
import { ProductRepository } from '../json/product.repository';
import { ProductService } from 'src/domain/services/product.service';
import { OfferService } from 'src/domain/services/offer.service';
import { OfferRepository } from '../json/offer.repository';
@Module({
  controllers: [ProductController],
  providers: [
    ProductUseCases,
    ProductService,
    OfferService,
    { provide: TOKENS.ProductRepository, useClass: ProductRepository },
    { provide: TOKENS.OfferRepository, useClass: OfferRepository },
  ],
})
export class ProductModule {}
