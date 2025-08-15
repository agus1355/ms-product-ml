import { DomainException } from "./DomainException";

export class ProductNotFoundException extends DomainException {
  constructor(productId: number) {
    super(`Product with id ${productId} not found`);
  }
}