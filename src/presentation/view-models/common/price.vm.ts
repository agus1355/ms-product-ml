import { ApiProperty } from "@nestjs/swagger";
import { Price } from "src/domain/models/price";

export class PriceVM {
  @ApiProperty({ example: 'USD', description: 'The currency of the price' })
  currency: string;

  @ApiProperty({ example: 999.99, description: 'The amount of the price' })
  amount: number;

  constructor(price: Price) {
    this.currency = price.currency;
    this.amount = price.amount;
  }
}