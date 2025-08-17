import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { Product } from '../models/product/product';
import { IProductRepository } from 'src/application/ports/product.repository.interface';
import { ProductNotFoundException } from '../exceptions/ProductNotFoundException';
import { ProductCategory } from '../models/product/product-category';

@Injectable()
export class ProductService {
    constructor(
        @Inject(TOKENS.ProductRepository)
        private readonly productRepository: IProductRepository
    ) {}

    async getProductById(productId: number): Promise<Product> {
        const product = await this.productRepository.findProductById(productId);
        if (!product) {
            throw new ProductNotFoundException(productId);
        }
        return product;
    }

    async getRelatedProductsByCategoriesAndLimit(productCategories: ProductCategory[], productIdToExclude: number, limit: number): Promise<Product[]> {
        const categoryIds: number[] = [];
        for (const productCategory of productCategories) {
            categoryIds.push(productCategory.category.id);
        }
        return this.productRepository.findProductsByCategoriesIdAndLimit(categoryIds, productIdToExclude, limit);
    }
}
