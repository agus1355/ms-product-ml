import { IVA_RATE } from "src/domain/constants/taxes.constants";
import { OfferStatus } from "../../enums/offer-status";
import { OfferType } from "../../enums/offer-type";
import { Price } from "../price";
import { InstallmentPlan } from "./installment-plan";
import { Seller } from "./seller";
import { Shipment } from "./shipment";
import { Discount } from "./discount";

export class Offer {
  constructor(
    public readonly basePrice: Price,
    public priceWithoutTaxes: Price,
    public discountedPrice: Price | null,
    public installmentPlan: InstallmentPlan | null,
    public readonly discount: Discount | null,
    public readonly date: Date,
    public readonly status: OfferStatus,
    public availableStock: number,
    public readonly offerType: OfferType,
    public readonly shipments: Shipment[],
    public readonly seller: Seller,
    public readonly productId: number
  ) {}

  public calculateDiscountedPrice(discountValue: number): void {
    this.discountedPrice = new Price(this.basePrice.currency, this.basePrice.amount * (1 - discountValue));
    this.calculatePriceWithoutTaxes();
  }

  public calculatePriceWithoutTaxes(): void {
    if(this.discountedPrice) {
      this.priceWithoutTaxes = new Price(this.discountedPrice.currency, this.discountedPrice.amount / (1 + IVA_RATE));
    } else {
      this.priceWithoutTaxes = new Price(this.basePrice.currency, this.basePrice.amount / (1 + IVA_RATE));
    }
  }

  public incrementAvailableStock(quantity: number): void {
    this.availableStock += quantity;
  }

  public decrementAvailableStock(quantity: number): void {
    if (this.availableStock >= quantity) {
      this.availableStock -= quantity;
    } else {
      throw new Error('Insufficient stock available');
    }
  }

  public calculateInstallmentPlan(numberOfInstallments: number, interestRate: number): void {
    this.installmentPlan = new InstallmentPlan(
      numberOfInstallments,
      new Price(this.basePrice.currency, (this.basePrice.amount / numberOfInstallments)*(1+interestRate)),
      interestRate
    );
  }
}