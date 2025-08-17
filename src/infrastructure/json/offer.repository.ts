import { Injectable } from '@nestjs/common';
import { JsonRepository } from './json.repository';
import { Offer } from 'src/domain/models/offer/offer';
import { IOfferRepository } from 'src/application/ports/offer.repository.interface';
import { toDomainOffer, toPersistenceOffer } from './mappers/offer/offer.mapper';
import { OfferType } from 'src/domain/enums/offer-type';

@Injectable()
export class OfferRepository extends JsonRepository<Offer> implements IOfferRepository {
  constructor() {
    super('src/infrastructure/json/data/offers.json', toDomainOffer, toPersistenceOffer);
  }

  async findBestPriceOfferByProductId(productId: number): Promise<Offer | null>{
    const rawBestPriceOffer = this.data.find(offer => offer.productId === productId && offer.offerType === OfferType.BEST_PRICE);
    if (!rawBestPriceOffer) {
      return null;
    }
    return this.mapToDomain(rawBestPriceOffer);
  }

  async findByProductIdAndOfferTypes(productId: number, offerTypes: string[]): Promise<Offer[]> {
    const rawOffers = this.data.filter(offer => 
      offer.productId === productId && offerTypes.includes(String(offer.offerType))
    );
    return rawOffers.map(this.mapToDomain);
  }
}
