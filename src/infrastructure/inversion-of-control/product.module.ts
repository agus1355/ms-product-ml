import { Module } from '@nestjs/common';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { ProductController } from 'src/presentation/controllers/product.controller';
import { TOKENS } from 'src/application/tokens';
import { ProductService } from 'src/domain/services/product.service';
import { OfferService } from 'src/domain/services/offer.service';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { OfferRepository } from '../json/offer.repository';
import { ProductRepository } from '../json/product.repository';
import { CachedProductRepository } from 'src/infrastructure/cache/cached-product.repository';
import { CachedOfferRepository } from 'src/infrastructure/cache/cached-offer.repository';

@Module({
  imports: [CacheModule.register({ ttl: 60000 })],
  controllers: [ProductController],
  providers: [
    ProductUseCases,
    ProductService,
    OfferService,
    ProductRepository,
    OfferRepository,
    {
      provide: TOKENS.ProductRepository,
      useFactory: (raw: ProductRepository, cacheManager: any) => new CachedProductRepository(cacheManager, raw),
      inject: [ProductRepository, CACHE_MANAGER],
    },
    {
      provide: TOKENS.OfferRepository,
      useFactory: (raw: OfferRepository, cacheManager: any) => new CachedOfferRepository(cacheManager, raw),
      inject: [OfferRepository, CACHE_MANAGER],
    },
  ],
})
export class ProductModule {}
