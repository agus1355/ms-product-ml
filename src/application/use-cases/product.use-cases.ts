import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/domain/models/product/product.js';
import { ProductService } from 'src/domain/services/product.service';

@Injectable()
export class ProductUseCases {
    constructor(
        private readonly productService: ProductService
    ) {}

    async getProductById(productId: number): Promise<Product> {
        return this.productService.getProductById(productId);
    }
}
