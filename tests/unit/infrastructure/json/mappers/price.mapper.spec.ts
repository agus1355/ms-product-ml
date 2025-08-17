import { Price } from 'src/domain/models/price';
import { toDomainPrice, toPersistencePrice } from 'src/infrastructure/json/mappers/price.mapper';

describe('PriceMapper', () => {
  describe('toDomainPrice', () => {
    it('should map a raw object to a Price domain model', () => {
      const raw = { currency: 'USD', amount: 100 };
      const price = toDomainPrice(raw);
      expect(price).toBeInstanceOf(Price);
      expect(price.currency).toBe(raw.currency);
      expect(price.amount).toBe(raw.amount);
    });
  });

  describe('toPersistencePrice', () => {
    it('should map a Price domain model to a raw object', () => {
      const price = new Price('USD', 100);
      const raw = toPersistencePrice(price);
      expect(raw).toEqual({ currency: 'USD', amount: 100 });
    });
  });
});
