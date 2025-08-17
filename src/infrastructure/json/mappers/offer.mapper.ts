import { Offer } from 'src/domain/models/offer';

export function toDomainOffer(raw: any): Offer {
  return new Offer(
    raw.basePrice,
    raw.priceWithoutVAT,
    raw.installmentPlan,
    new Date(raw.date),
    raw.status,
    raw.availableStock,
    raw.offerType,
    raw.shipments,
    raw.seller,
    raw.productId,
  );
}

export function toPersistenceOffer(offer: Offer): any {
  return {
    basePrice: offer.basePrice,
    priceWithoutVAT: offer.priceWithoutVAT,
    installmentPlan: offer.installmentPlan,
    date: offer.date.toISOString(),
    status: offer.status,
    availableStock: offer.availableStock,
    offerType: offer.offerType,
    shipments: offer.shipments,
    seller: offer.seller,
    productId: offer.productId,
  };
}
