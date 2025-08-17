import { Price } from 'src/domain/models/price';

export function toDomainPrice(raw: any): Price {
  return new Price(raw.currency, raw.amount);
}

export function toPersistencePrice(price: Price): any {
  return { currency: price.currency, amount: price.amount };
}
