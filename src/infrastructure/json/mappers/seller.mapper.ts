import { Seller } from 'src/domain/models/seller';

export function toDomainSeller(raw: any): Seller {
  return new Seller(raw.id, raw.name, raw.score, raw.isVerified);
}

export function toPersistenceSeller(seller: Seller): any {
  return { id: seller.id, name: seller.name, score: seller.score, isVerified: seller.isVerified };
}
