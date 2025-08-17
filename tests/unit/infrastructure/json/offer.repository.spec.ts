import { OfferRepository } from 'src/infrastructure/json/offer.repository';
import { Offer } from 'src/domain/models/offer/offer';
import { OfferType } from 'src/domain/enums/offer-type';
import * as fs from 'fs';

jest.mock('fs');

describe('OfferRepository', () => {
  let repository: OfferRepository;

  const mockData = [
    { productId: 1, offerType: OfferType.BEST_PRICE, basePrice: { amount: 100, currency: 'USD' }, priceWithoutTaxes: { amount: 80, currency: 'USD' }, shipments: [], seller: {} },
    { productId: 1, offerType: OfferType.BEST_INSTALLMENTS, basePrice: { amount: 120, currency: 'USD' }, priceWithoutTaxes: { amount: 100, currency: 'USD' }, shipments: [], seller: {} },
    { productId: 2, offerType: OfferType.BEST_INSTALLMENTS, basePrice: { amount: 200, currency: 'USD' }, priceWithoutTaxes: { amount: 180, currency: 'USD' }, shipments: [], seller: {} },
  ];

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
    repository = new OfferRepository();
  });

  describe('findBestPriceOfferByProductId', () => {
    it('should return the best price offer for a given product id', async () => {
      const productId = 1;
      const bestOffer = await repository.findBestPriceOfferByProductId(productId);
      expect(bestOffer).toBeInstanceOf(Offer);
      expect(bestOffer!.productId).toBe(productId);
      expect(bestOffer!.offerType).toBe(OfferType.BEST_PRICE);
    });

    it('should return null if no best price offer is found', async () => {
      const productId = 2;
      const bestOffer = await repository.findBestPriceOfferByProductId(productId);
      expect(bestOffer).toBeNull();
    });
  });

  describe('findByProductIdAndOfferTypes', () => {
    it('should return offers matching the given product id and offer types', async () => {
      const productId = 1;
      const offerTypes = [OfferType.BEST_PRICE, OfferType.BEST_INSTALLMENTS];
      const offers = await repository.findByProductIdAndOfferTypes(productId, offerTypes);
      expect(offers).toHaveLength(2);
    });

    it('should return an empty array if no offers match', async () => {
      const productId = 3;
      const offerTypes = [OfferType.BEST_PRICE];
      const offers = await repository.findByProductIdAndOfferTypes(productId, offerTypes);
      expect(offers).toHaveLength(0);
    });
  });
});
