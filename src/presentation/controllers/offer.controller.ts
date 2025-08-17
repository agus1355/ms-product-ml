import { Controller, Get, Param, Query } from '@nestjs/common';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { OfferUseCases } from 'src/application/use-cases/offer.use-cases';
import { OfferVM } from '../view-models/offer/offer.vm';
import { OfferType } from 'src/domain/enums/offer-type';
import { OfferFilterVM } from '../view-models/offer/offer-filter.vm';

@Controller()
export class OfferController {
    constructor(private readonly offerUseCases: OfferUseCases) {}

    @Get('products/:id/offers')
    async getProductOffersByType(
        @Param('id', PositiveIntPipe) productId: number,
        @Query() filter: OfferFilterVM
    ): Promise<OfferVM[]> {
        const offers = await this.offerUseCases.getOffersByProductIdAndOfferTypes(productId, filter.offerTypes ? filter.offerTypes : [], filter.limit);
        return offers.map((offer) => new OfferVM(offer));
    }
}