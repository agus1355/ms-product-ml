import { Price } from "../price";

export class Shipment {
  constructor(
    public readonly type: string,
    public readonly deliveryTime: string,
    public readonly cost: Price,
    public readonly isFreeForBuyer: boolean
  ) {}
}