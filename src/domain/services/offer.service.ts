import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { Category } from '../models/category';
import { IOfferRepository } from 'src/application/ports/offer.repository.interface';
import { Offer } from '../models/offer';
import { OfferType } from '../enums/offer-type';

@Injectable()
export class OfferService {
    constructor(
        @Inject(TOKENS.OfferRepository)
        private readonly offerRepository: IOfferRepository
    ) {}

    async getOffersByProductIdAndOfferTypes(productId: number, offerTypes: OfferType[], limit?: number): Promise<Offer[]> {
        const offers = await this.offerRepository.findByProductIdAndOfferTypes(productId, offerTypes);
        // if (!offers || offers.length === 0) {
        //     throw new NotFoundException(`No offers found for product with ID ${productId} and offer types ${offerTypes.join(', ')}`);
        // }
        if (limit && offers.length > 0) {
            return offers.slice(0, limit);
        }
        return offers;
    }

    async getAllOffersByProductId(productId: number, limit?: number): Promise<Offer[]> {
        const offers = await this.offerRepository.findBy({productId});
        if (!offers || offers.length === 0) {
            throw new NotFoundException(`No offers found for product with ID ${productId}`);
        }
        if(limit){
            return offers.slice(0, limit);
        }
        return offers;
    }

    async getBestPricedOfferByProductId(productId: number): Promise<Offer> {
        const bestPricedOffer = await this.offerRepository.findBestPriceOfferByProductId(productId);
        if (!bestPricedOffer) {
            throw new NotFoundException(`No offers found for product with ID ${productId}`);
        }
        return bestPricedOffer;
    }
}
