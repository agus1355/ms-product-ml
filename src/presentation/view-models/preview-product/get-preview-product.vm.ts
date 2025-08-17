import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/domain/models/product/product";
import { InstallmentPlanVM } from "../common/installment-plan.vm";
import { PriceVM } from "../common/price.vm";

export class GetPreviewProductVM {
    @ApiProperty({ example: 'Apple iPhone 13 Pro', description: 'The name of the product' })
    name: string;

    @ApiProperty({ type: () => PriceVM, description: 'The original price of the product' })
    originalPrice: PriceVM;

    //discountedPrice: PriceVM;

    @ApiProperty({ type: () => InstallmentPlanVM, required: false, description: 'The installment plan for the product' })
    priceWithInstallments?: InstallmentPlanVM;

    @ApiProperty({ example: true, description: 'Indicates if the product has free shipping' })
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
