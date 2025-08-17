import { Discount } from 'src/domain/models/offer/discount';

export function toDomainDiscount(raw: any): Discount {
  return new Discount(
    raw.discountValue,
    new Date(raw.dateFrom),
    new Date(raw.dateTo),
    new Date(raw.creationDate),
    raw.enabled,
    new Date(raw.updatedAt)
  );
}

export function toPersistenceDiscount(discount: Discount): any {
  return {
    discountValue: discount.discountValue,
    dateFrom: discount.dateFrom.toISOString(),
    dateTo: discount.dateTo.toISOString(),
    creationDate: discount.creationDate.toISOString(),
    enabled: discount.enabled,
    updatedAt: discount.updatedAt.toISOString(),
  };
}
