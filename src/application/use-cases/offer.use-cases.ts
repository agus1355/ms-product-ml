import { Injectable } from '@nestjs/common';
import { OfferType } from 'src/domain/enums/offer-type';
import { Offer } from 'src/domain/models/offer/offer';
import { OfferService } from 'src/domain/services/offer.service';

@Injectable()
export class OfferUseCases {
    constructor(
        private readonly offerService: OfferService
    ) {}

    async getOffersByProductIdAndOfferTypes(productId: number, offerTypes: OfferType[], limit?: number): Promise<Offer[]> {
        if(offerTypes && offerTypes.length > 0) {
            return this.offerService.getOffersByProductIdAndOfferTypes(productId, offerTypes, limit);
        }
        return this.offerService.getAllOffersByProductId(productId, limit);
    }
}
