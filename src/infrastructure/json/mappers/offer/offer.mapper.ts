import { Offer } from 'src/domain/models/offer/offer';
import { toDomainPrice } from '../price.mapper';
import { toDomainInstallmentPlan } from './installment-plan.mapper';
import { toDomainShipment } from './shipment.mapper';
import { toDomainDiscount } from './discount.mapper';

export function toDomainOffer(raw: any): Offer {
  return new Offer(
    toDomainPrice(raw.basePrice),
    toDomainPrice(raw.priceWithoutTaxes),
    raw.discountedPrince ? toDomainPrice(raw.discountedPrice) : null,
    raw.installmentPlan ? toDomainInstallmentPlan(raw.installmentPlan) : null,
    raw.discount ? toDomainDiscount(raw.discount) : null,
    new Date(raw.date),
    raw.status,
    raw.availableStock,
    raw.offerType,
    raw.shipments.map(toDomainShipment),
    raw.seller,
    raw.productId,
  );
}

export function toPersistenceOffer(offer: Offer): any {
  return {
    basePrice: offer.basePrice,
    priceWithoutTaxes: offer.priceWithoutTaxes,
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
