import { Module } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { OfferService } from 'src/domain/services/offer.service';
import { OfferRepository } from '../json/offer.repository';
import { OfferController } from 'src/presentation/controllers/offer.controller';
import { OfferUseCases } from 'src/application/use-cases/offer.use-cases';
@Module({
  controllers: [OfferController],
  providers: [
    OfferUseCases,
    OfferService,
    { provide: TOKENS.OfferRepository, useClass: OfferRepository },
  ],
})
export class OfferModule {}
