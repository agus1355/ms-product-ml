import { Offer } from 'src/domain/models/offer/offer';
import { Price } from 'src/domain/models/price';
import { OfferStatus } from 'src/domain/enums/offer-status';
import { OfferType } from 'src/domain/enums/offer-type';
import { Seller } from 'src/domain/models/offer/seller';
import { InsufficientStockException } from 'src/domain/exceptions/InsufficientStockException';
import { IVA_RATE } from 'src/domain/constants/taxes.constants';

describe('Offer', () => {
  let offer: Offer;
  const mockSeller = new Seller(1, 'Test Seller', 5, true);
  const basePrice = new Price('USD', 100);

  beforeEach(() => {
    offer = new Offer(
      basePrice,
      new Price('USD', basePrice.amount / (1 + IVA_RATE)),
      null,
      null,
      null,
      new Date(),
      OfferStatus.ENABLE,
      10,
      OfferType.BEST_PRICE,
      [],
      mockSeller,
      1,
    );
  });

  it('should be defined', () => {
    expect(offer).toBeDefined();
  });

  describe('calculateDiscountedPrice', () => {
    it('should calculate the discounted price correctly', () => {
      const discountValue = 0.2; // 20%
      offer.calculateDiscountedPrice(discountValue);
      expect(offer.discountedPrice).toBeDefined();
      expect(offer.discountedPrice!.amount).toBe(basePrice.amount * (1 - discountValue));
    });
  });

  describe('calculatePriceWithoutTaxes', () => {
    it('should calculate price without taxes from base price if no discount', () => {
      offer.calculatePriceWithoutTaxes();
      expect(offer.priceWithoutTaxes.amount).toBeCloseTo(basePrice.amount / (1 + IVA_RATE));
    });

    it('should calculate price without taxes from discounted price if discount exists', () => {
      const discountValue = 0.2; // 20%
      offer.calculateDiscountedPrice(discountValue);
      offer.calculatePriceWithoutTaxes();
      expect(offer.discountedPrice).toBeDefined();
      expect(offer.priceWithoutTaxes.amount).toBeCloseTo(offer.discountedPrice!.amount / (1 + IVA_RATE));
    });
  });

  describe('incrementAvailableStock', () => {
    it('should increment the available stock', () => {
      const initialStock = offer.availableStock;
      const quantity = 5;
      offer.incrementAvailableStock(quantity);
      expect(offer.availableStock).toBe(initialStock + quantity);
    });
  });

  describe('decrementAvailableStock', () => {
    it('should decrement the available stock', () => {
      const initialStock = offer.availableStock;
      const quantity = 5;
      offer.decrementAvailableStock(quantity);
      expect(offer.availableStock).toBe(initialStock - quantity);
    });

    it('should throw InsufficientStockException if stock is not enough', () => {
      const quantity = offer.availableStock + 1;
      expect(() => offer.decrementAvailableStock(quantity)).toThrow(InsufficientStockException);
    });
  });

  describe('calculateInstallmentPlan', () => {
    it('should calculate the installment plan correctly', () => {
      const numberOfInstallments = 12;
      const interestRate = 0.1; // 10%
      offer.calculateInstallmentPlan(numberOfInstallments, interestRate);
      expect(offer.installmentPlan).toBeDefined();
      expect(offer.installmentPlan!.numberOfInstallments).toBe(numberOfInstallments);
      expect(offer.installmentPlan!.interestRate).toBe(interestRate);
      const expectedInstallmentAmount = (basePrice.amount / numberOfInstallments) * (1 + interestRate);
      expect(offer.installmentPlan!.installmentAmount.amount).toBeCloseTo(expectedInstallmentAmount);
    });
  });
});
