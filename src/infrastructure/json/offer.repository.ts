import { Injectable } from '@nestjs/common';
import { JsonRepository } from './json.repository';
import { Offer } from 'src/domain/models/offer';
import { IOfferRepository } from 'src/application/ports/offer.repository.interface';

@Injectable()
export class OfferRepository extends JsonRepository<Offer> implements IOfferRepository {
  constructor() {
    super('src/infrastructure/json/data/offers.json');
  }

  async findBestPriceOfferByProductId(productId: number): Promise<Offer | null>{
    const offers = this.data.filter(offer => offer.productId === productId);
    if (offers.length === 0) {
      return null;
    }
    return offers.reduce((bestOffer, currentOffer) => 
      currentOffer.basePrice < bestOffer.basePrice ? currentOffer : bestOffer
    );
  }

  async findByProductIdAndOfferTypes(productId: number, offerTypes: string[]): Promise<Offer[]> {
    return this.data.filter(offer => 
      offer.productId === productId && offerTypes.includes(offer.offerType)
    );
  }
}
