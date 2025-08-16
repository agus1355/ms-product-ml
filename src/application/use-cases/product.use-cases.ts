import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/domain/models/product/product.js';
import { OfferService } from 'src/domain/services/offer.service';
import { ProductService } from 'src/domain/services/product.service';

@Injectable()
export class ProductUseCases {
    constructor(
        private readonly productService: ProductService,
        private readonly offerService: OfferService
    ) {}

    async getProductById(productId: number): Promise<Product> {
        return this.productService.getProductById(productId);
    }

    async getRelatedProductsByIdAndLimit(productId: number, limit: number): Promise<Product[]> {
        const product = await this.productService.getProductById(productId);
        const relatedProducts = await this.productService.getRelatedProductsByCategoriesAndLimit(product.categories, productId, limit);
        for (const relatedProduct of relatedProducts) {
            relatedProduct.bestOffers.push(await this.offerService.getBestPricedOfferByProductId(relatedProduct.id));
        }
        return relatedProducts;
    }
}
