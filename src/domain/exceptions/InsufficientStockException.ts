import { DomainException } from "./DomainException";

export class InsufficientStockException extends DomainException {
  constructor() {
    super(`Insufficient stock available`);
  }
}