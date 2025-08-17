import { Controller, Get, Param, Query } from '@nestjs/common';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { OfferUseCases } from 'src/application/use-cases/offer.use-cases';
import { OfferVM } from '../view-models/offer/offer.vm';
import { OfferFilterVM } from '../view-models/offer/offer-filter.vm';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('offers')
@Controller()
export class OfferController {
    constructor(private readonly offerUseCases: OfferUseCases) {}

    @Get('products/:id/offers')
    @ApiOperation({ summary: 'Get offers for a product' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the product', type: Number })
    @ApiResponse({ status: 200, description: 'A list of offers for the product.', type: [OfferVM] })
    @ApiResponse({ status: 404, description: 'Product with the given ID not found.' })
    async getProductOffersByType(
        @Param('id', PositiveIntPipe) productId: number,
        @Query() filter: OfferFilterVM
    ): Promise<OfferVM[]> {
        const offers = await this.offerUseCases.getOffersByProductIdAndOfferTypes(productId, filter.offerTypes ? filter.offerTypes : [], filter.limit);
        return offers.map((offer) => new OfferVM(offer));
    }
}