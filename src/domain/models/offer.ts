import { OfferStatus } from "../enums/offer-status";
import { OfferType } from "../enums/offer-type";
import { InstallmentPlan } from "./installment-plan";
import { Price } from "./price";
import { Seller } from "./seller";
import { Shipment } from "./shipment";

export class Offer {
  constructor(
    public readonly basePrice: Price,
    public readonly priceWithoutVAT: Price,
    public readonly installmentPlan: InstallmentPlan | null,
    public readonly date: Date,
    public readonly status: OfferStatus,
    public readonly availableStock: number,
    public readonly offerType: OfferType,
    public readonly shipments: Shipment[],
    public readonly seller: Seller,
    public readonly productId: number
  ) {}
}