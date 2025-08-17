import { Offer } from 'src/domain/models/offer/offer';
import { toDomainOffer, toPersistenceOffer } from 'src/infrastructure/json/mappers/offer/offer.mapper';
import * as priceMapper from 'src/infrastructure/json/mappers/price.mapper';
import * as installmentPlanMapper from 'src/infrastructure/json/mappers/offer/installment-plan.mapper';
import * as shipmentMapper from 'src/infrastructure/json/mappers/offer/shipment.mapper';
import * as discountMapper from 'src/infrastructure/json/mappers/offer/discount.mapper';
import { Price } from 'src/domain/models/price';
import { OfferType } from 'src/domain/enums/offer-type';
import { OfferStatus } from 'src/domain/enums/offer-status';
import { Seller } from 'src/domain/models/offer/seller';

jest.mock('src/infrastructure/json/mappers/price.mapper');
jest.mock('src/infrastructure/json/mappers/offer/installment-plan.mapper');
jest.mock('src/infrastructure/json/mappers/offer/shipment.mapper');
jest.mock('src/infrastructure/json/mappers/offer/discount.mapper');

describe('OfferMapper', () => {
    const rawOffer = {
        basePrice: { currency: 'USD', amount: 100 },
        priceWithoutTaxes: { currency: 'USD', amount: 82.64 },
        discountedPrice: null,
        installmentPlan: null,
        discount: null,
        date: new Date().toISOString(),
        status: OfferStatus.ENABLE,
        availableStock: 10,
        offerType: OfferType.BEST_PRICE,
        shipments: [],
        seller: { id: 1, name: 'Test Seller', score: 5, isVerified: true },
        productId: 1,
    };

  describe('toDomainOffer', () => {
    it('should map a raw object to a Offer domain model', () => {
      const mockedPrice = new Price('USD', 100);
      (priceMapper.toDomainPrice as jest.Mock).mockReturnValue(mockedPrice);

      const offer = toDomainOffer(rawOffer);

      expect(offer).toBeInstanceOf(Offer);
      expect(offer.productId).toBe(rawOffer.productId);
      expect(priceMapper.toDomainPrice).toHaveBeenCalledTimes(2);
    });
  });

  describe('toPersistenceOffer', () => {
    it('should map a Offer domain model to a raw object', () => {
      const offer = new Offer(
        new Price('USD', 100),
        new Price('USD', 82.64),
        null,
        null,
        null,
        new Date(),
        OfferStatus.ENABLE,
        10,
        OfferType.BEST_PRICE,
        [],
        new Seller(1, 'Test', 5, true),
        1
      );
      const raw = toPersistenceOffer(offer);
      expect(raw.productId).toBe(offer.productId);
    });
  });
});
