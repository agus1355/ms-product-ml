import { Seller } from 'src/domain/models/offer/seller';
import { toDomainSeller, toPersistenceSeller } from 'src/infrastructure/json/mappers/offer/seller.mapper';

describe('SellerMapper', () => {
  const rawSeller = {
    id: 1,
    name: 'Test Seller',
    score: 5,
    isVerified: true,
  };

  describe('toDomainSeller', () => {
    it('should map a raw object to a Seller domain model', () => {
      const seller = toDomainSeller(rawSeller);
      expect(seller).toBeInstanceOf(Seller);
      expect(seller.id).toBe(rawSeller.id);
      expect(seller.name).toBe(rawSeller.name);
    });
  });

  describe('toPersistenceSeller', () => {
    it('should map a Seller domain model to a raw object', () => {
      const seller = new Seller(1, 'Test Seller', 5, true);
      const raw = toPersistenceSeller(seller);
      expect(raw).toEqual(rawSeller);
    });
  });
});
