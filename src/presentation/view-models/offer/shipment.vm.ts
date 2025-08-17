import { Price } from "src/domain/models/price";
import { PriceVM } from "../common/price.vm";

export class ShipmentVM {
  readonly type: string;
  readonly deliveryTime: string;
  readonly cost: PriceVM;

  constructor(type: string, deliveryTime: string, cost: Price) {
    this.type = type;
    this.deliveryTime = deliveryTime;
    this.cost = cost;
  }
}
