import { DomainException } from "./DomainException";

export class OfferNotFoundException extends DomainException {
  constructor(productId: number) {
    super(`Offer not found for product with id ${productId}`);
  }
}