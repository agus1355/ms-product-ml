import { Product } from 'src/domain/models/product/product';
import { Offer } from 'src/domain/models/offer/offer';
import { Review } from 'src/domain/models/review/review';
import { OfferNotFoundException } from 'src/domain/exceptions/OfferNotFoundException';
import { Price } from 'src/domain/models/price';
import { OfferStatus } from 'src/domain/enums/offer-status';
import { OfferType } from 'src/domain/enums/offer-type';
import { Seller } from 'src/domain/models/offer/seller';

describe('Product', () => {
  let product: Product;
  const mockSeller = new Seller(1, 'Test Seller', 5, true);

  const offerFactory = (productId: number, offerType: OfferType, amount: number) => {
    const price = new Price('USD', amount);
    return new Offer(
        price,
        price,
        null,
        null,
        null,
        new Date(),
        OfferStatus.ENABLE,
        10,
        offerType,
        [],
        mockSeller,
        productId,
    );
  }

  beforeEach(() => {
    product = new Product(
      1,
      'Test Product',
      'description',
      [],
      'new',
      true,
      new Date(),
      'active',
      0,
      [],
      [],
      [],
      undefined,
      undefined
    );
  });

  it('should be defined', () => {
    expect(product).toBeDefined();
  });

  describe('getBestOffer', () => {
    it('should return the best offer if it exists', () => {
      const bestOffer = offerFactory(1, OfferType.BEST_PRICE, 100);
      product.bestOffer = bestOffer;
      expect(product.getBestOffer()).toEqual(bestOffer);
    });

    it('should throw OfferNotFoundException if there is no best offer', () => {
      product.bestOffer = undefined;
      expect(() => product.getBestOffer()).toThrow(OfferNotFoundException);
    });
  });

  describe('calculateReviewScore', () => {
    it('should calculate the review score correctly', () => {
      const reviews = [
        new Review(1, 4, 'review 1', new Date(), [], 1),
        new Review(2, 5, 'review 2', new Date(), [], 1),
      ];
      product.reviews.push(...reviews);
      product.calculateReviewScore();
      expect(product.reviewScore).toBe(4.5);
    });

    it('should return 0 if there are no reviews', () => {
      product.calculateReviewScore();
      expect(product.reviewScore).toBe(0);
    });
  });
});
