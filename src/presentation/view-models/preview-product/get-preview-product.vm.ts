import { Product } from "src/domain/models/product/product";
import { InstallmentPlanVM } from "../common/installment-plan.vm";
import { PriceVM } from "../common/price.vm";

export class GetPreviewProductVM {
    name: string;
    originalPrice: PriceVM;
    //discountedPrice: PriceVM;
    priceWithInstallments?: InstallmentPlanVM;
    isFreeShipping: boolean;

    constructor(product: Product) {
        const offer = product.bestOffers[0];
        
        this.name = product.name
        this.originalPrice = new PriceVM(offer.basePrice);
        //this.discountedPrice
        if (offer.installmentPlan) {
            this.priceWithInstallments = new InstallmentPlanVM(offer.installmentPlan);
        }
        
        this.isFreeShipping = offer.shipments.some(shipment => shipment.isFreeForBuyer);
    }
}
