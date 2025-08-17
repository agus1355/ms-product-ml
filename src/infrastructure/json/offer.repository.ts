import { Injectable } from '@nestjs/common';
import { JsonRepository } from './json.repository';
import { Offer } from 'src/domain/models/offer';
import { IOfferRepository } from 'src/application/ports/offer.repository.interface';
import { toDomainOffer, toPersistenceOffer } from './mappers/offer.mapper';

@Injectable()
export class OfferRepository extends JsonRepository<Offer> implements IOfferRepository {
  constructor() {
    super('src/infrastructure/json/data/offers.json', toDomainOffer, toPersistenceOffer);
  }

  async findBestPriceOfferByProductId(productId: number): Promise<Offer | null>{
    const offers = this.data.filter(offer => offer.productId === productId);
    if (offers.length === 0) {
      return null;
    }
    const bestPriceOffer = offers.reduce((bestOffer, currentOffer) => 
      currentOffer.basePrice.amount < bestOffer.basePrice.amount ? currentOffer : bestOffer
    );
    return this.mapToDomain(bestPriceOffer);
  }

  async findByProductIdAndOfferTypes(productId: number, offerTypes: string[]): Promise<Offer[]> {
    const rawOffers = this.data.filter(offer => 
      offer.productId === productId && offerTypes.includes(String(offer.offerType))
    );
    return rawOffers.map(this.mapToDomain);
  }
}
