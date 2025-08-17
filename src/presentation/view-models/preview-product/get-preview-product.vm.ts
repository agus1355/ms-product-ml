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
        this.name = product.name
        this.originalPrice = new PriceVM(product.getBestOffer().basePrice);
        //this.discountedPrice
        if (product.bestOffer?.installmentPlan) {
            this.priceWithInstallments = new InstallmentPlanVM(product.bestOffer?.installmentPlan);
        }
        
        this.isFreeShipping = product.getBestOffer().shipments.some(shipment => shipment.isFreeForBuyer);
    }
}
