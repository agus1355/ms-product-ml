import { DomainException } from "./DomainException";

export class OfferNotFoundException extends DomainException {
  constructor(productId?: number) {
    const message = productId
      ? `Offer not found for product with id ${productId}`
      : `Offer not found`;
    super(message);
  }
}