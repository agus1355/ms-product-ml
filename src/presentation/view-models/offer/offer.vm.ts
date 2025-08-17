import { ApiProperty } from "@nestjs/swagger";
import { InstallmentPlanVM } from "../common/installment-plan.vm";
import { PriceVM } from "../common/price.vm";
import { SellerVM } from "../common/seller.vm";
import { ShipmentVM } from "./shipment.vm";
import { Offer } from "src/domain/models/offer/offer";

export class OfferVM {
  @ApiProperty({ type: () => PriceVM, description: 'The base price of the offer' })
  readonly basePrice: PriceVM;

  @ApiProperty({ type: () => PriceVM, description: 'The price without taxes' })
  readonly priceWithoutTaxes: PriceVM;

  @ApiProperty({ type: () => InstallmentPlanVM, nullable: true, description: 'The installment plan for the offer' })
  readonly installmentPlan: InstallmentPlanVM | null;

  @ApiProperty({ type: () => [ShipmentVM], description: 'The shipment options for the offer' })
  readonly shipments: ShipmentVM[];

  @ApiProperty({ example: '2023-05-18T10:00:00Z', description: 'The date of the offer' })
  readonly date: Date;

  @ApiProperty({ example: 'Active', description: 'The status of the offer' })
  readonly status: string;

  @ApiProperty({ example: 100, description: 'The available stock for the offer' })
  readonly availableStock: number;

  @ApiProperty({ example: 'Flash', nullable: true, description: 'The type of the offer' })
  readonly offerType: string | null;

  @ApiProperty({ type: () => SellerVM, description: 'The seller of the offer' })
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
