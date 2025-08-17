import { InstallmentPlanVM } from "../common/installment-plan.vm";
import { PriceVM } from "../common/price.vm";
import { SellerVM } from "../common/seller.vm";
import { ShipmentVM } from "./shipment.vm";
import { Offer } from "src/domain/models/offer/offer";

export class OfferVM {
  readonly basePrice: PriceVM;
  readonly priceWithoutTaxes: PriceVM;
  readonly installmentPlan: InstallmentPlanVM | null;
  readonly shipments: ShipmentVM[];
  readonly date: Date;
  readonly status: string;
  readonly availableStock: number;
  readonly offerType: string | null;
  readonly seller: SellerVM;

  constructor(offer: Offer) {
    this.basePrice = new PriceVM(offer.basePrice);
    this.priceWithoutTaxes = new PriceVM(offer.priceWithoutTaxes);
    this.installmentPlan = offer.installmentPlan
      ? new InstallmentPlanVM(offer.installmentPlan)
      : null;
    this.shipments = offer.shipments.map(
      (s) => new ShipmentVM(s.type, s.deliveryTime, new PriceVM(s.cost)),
    );
    this.date = offer.date;
    this.status = offer.status;
    this.availableStock = offer.availableStock;
    this.offerType = offer.offerType;
    this.seller = offer.seller;
  }
}
