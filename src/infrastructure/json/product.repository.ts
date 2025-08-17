import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/models/product/product";
import { JsonRepository } from "./json.repository";
import { IProductRepository } from "src/application/ports/product.repository.interface";
import { toDomainProduct, toPersistenceProduct } from './mappers/product.mapper';

@Injectable()
export class ProductRepository extends JsonRepository<Product> implements IProductRepository {
  constructor() {
    super('src/infrastructure/json/data/products.json', toDomainProduct, toPersistenceProduct);
  }

  async findProductById(productId: number): Promise<Product | null> {
    const product = await this.findOneBy({ id: productId });
    product?.photos.sort((a, b) => a.order - b.order);
    return product;
  }

  async findProductsByCategoriesIdAndLimit(categoryIds: number[], productIdToExclude: number, limit: number): Promise<Product[]> {
    const rawProducts = this.data.filter(product =>
      product.categories.some(pc => categoryIds.includes(pc.category.id) && product.id !== productIdToExclude)
    )
    return rawProducts.slice(0, limit).map(this.mapToDomain);
  }
}
