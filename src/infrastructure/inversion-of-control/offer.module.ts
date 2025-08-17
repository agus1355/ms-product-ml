import { Module } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { OfferService } from 'src/domain/services/offer.service';
import { OfferController } from 'src/presentation/controllers/offer.controller';
import { OfferUseCases } from 'src/application/use-cases/offer.use-cases';
import { CachedOfferRepository } from 'src/infrastructure/cache/cached-offer.repository';
import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import { OfferRepository } from '../json/offer.repository';

@Module({
  imports: [CacheModule.register({ ttl: 60000 })],
  controllers: [OfferController],
  providers: [
    OfferUseCases,
    OfferService,
    OfferRepository,
    {
      provide: TOKENS.OfferRepository,
      useFactory: (raw: OfferRepository, cacheManager: any) => new CachedOfferRepository(cacheManager, raw),
      inject: [OfferRepository, CACHE_MANAGER],
    },
  ],
})
export class OfferModule {}
