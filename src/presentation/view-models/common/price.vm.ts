import { Price } from "src/domain/models/price";

export class PriceVM {
  currency: string;
  amount: number;

  constructor(price: Price) {
    this.currency = price.currency;
    this.amount = price.amount;
  }
}