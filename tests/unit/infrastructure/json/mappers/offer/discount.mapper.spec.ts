import { Discount } from 'src/domain/models/offer/discount';
import { toDomainDiscount, toPersistenceDiscount } from 'src/infrastructure/json/mappers/offer/discount.mapper';

describe('DiscountMapper', () => {
  const rawDiscount = {
    discountValue: 0.1,
    dateFrom: new Date().toISOString(),
    dateTo: new Date().toISOString(),
    creationDate: new Date().toISOString(),
    enabled: true,
    updatedAt: new Date().toISOString(),
  };

  describe('toDomainDiscount', () => {
    it('should map a raw object to a Discount domain model', () => {
      const discount = toDomainDiscount(rawDiscount);
      expect(discount).toBeInstanceOf(Discount);
      expect(discount.discountValue).toBe(rawDiscount.discountValue);
    });
  });

  describe('toPersistenceDiscount', () => {
    it('should map a Discount domain model to a raw object', () => {
      const discount = new Discount(
        0.1,
        new Date(),
        new Date(),
        new Date(),
        true,
        new Date()
      );
      const raw = toPersistenceDiscount(discount);
      expect(raw.discountValue).toBe(discount.discountValue);
    });
  });
});
