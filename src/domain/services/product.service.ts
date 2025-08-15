import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { Product } from '../models/product/product';
import { IProductRepository } from 'src/application/ports/product.repository.interface';
import { ProductNotFoundException } from '../exceptions/ProductNotFoundException';

@Injectable()
export class ProductService {
    constructor(
        @Inject(TOKENS.ProductRepository)
        private readonly productRepository: IProductRepository
    ) {}

    async getProductById(productId: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id: productId });
        if (!product) {
            throw new ProductNotFoundException(productId);
        }
        return product;
    }
}
