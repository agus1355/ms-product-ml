import { ApiProperty } from "@nestjs/swagger";
import { Price } from "src/domain/models/price";
import { PriceVM } from "../common/price.vm";

export class ShipmentVM {
  @ApiProperty({ example: 'Express', description: 'The type of the shipment' })
  readonly type: string;

  @ApiProperty({ example: '24 hours', description: 'The delivery time for the shipment' })
  readonly deliveryTime: string;

  @ApiProperty({ type: () => PriceVM, description: 'The cost of the shipment' })
  readonly cost: PriceVM;

  constructor(type: string, deliveryTime: string, cost: Price) {
    this.type = type;
    this.deliveryTime = deliveryTime;
    this.cost = cost;
  }
}
