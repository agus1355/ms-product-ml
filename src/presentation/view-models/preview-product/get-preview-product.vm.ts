import { Product } from "src/domain/models/product/product";
import { InstallmentPlanVM } from "../common/installment-plan.vm";
import { PriceVM } from "../common/price.vm";
import { DiscountVM } from "../common/discount.vm";
import { ApiProperty } from '@nestjs/swagger';

export class GetPreviewProductVM {
    @ApiProperty({ example: 1, description: 'The unique identifier of the product' })
    id: number;

    @ApiProperty({ example: 'Apple iPhone 13 Pro', description: 'The name of the product' })
    name: string;
    
    @ApiProperty({ type: () => PriceVM, description: 'The base price' })
    originalPrice: PriceVM;
    
    @ApiProperty({ type: () => PriceVM, description: 'The discounted price of the product, if there is an available discount' })
    discountedPrice: PriceVM;

    @ApiProperty({ type: () => PriceVM, description: 'Information about available discount' })
    discount: DiscountVM | null;

    @ApiProperty({ type: () => InstallmentPlanVM, required: false, description: 'The installment plan for the product' })
    priceWithInstallments?: InstallmentPlanVM;
  
    @ApiProperty({ type: () => InstallmentPlanVM, required: false, description: 'indicates if there is a free shipping' })
    isFreeShipping: boolean;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name
        this.originalPrice = new PriceVM(product.getBestOffer().basePrice);
        this.discountedPrice = new PriceVM(product.getBestOffer().discountedPrice || product.getBestOffer().priceWithoutTaxes);
        const discount = product.getBestOffer().discount;
        if(discount){
            this.discount = new DiscountVM(discount);
        }
        else{
            this.discount = null;
        }
        if (product.bestOffer?.installmentPlan) {
            this.priceWithInstallments = new InstallmentPlanVM(product.bestOffer?.installmentPlan);
        }
        
        this.isFreeShipping = product.getBestOffer().shipments.some(shipment => shipment.isFreeForBuyer);
    }
}
