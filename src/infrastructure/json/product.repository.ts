import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/models/product/product";
import { JsonRepository } from "./json.repository";
import { IProductRepository } from "src/application/ports/product.repository.interface";

@Injectable()
export class ProductRepository extends JsonRepository<Product> implements IProductRepository {
  constructor() {
    super('src/infrastructure/json/data/products.json');
  }

  async findProductById(productId: number): Promise<Product | null> {
    const product = this.data.find(product => product.id === productId);
    if (!product) return null;
    return new Product(
      product.id,
      product.name,
      product.description,
      product.specificationGroups,
      product.condition,
      product.isReturnable,
      product.creationDate,
      product.warranty,
      product.status,
      product.reviewScore,
      product.photos,
      product.reviews,
      product.categories
    );
  }

  async findProductsByCategoriesIdAndLimit(categoryIds: number[], productIdToExclude: number, limit: number): Promise<Product[]> {
    const products = this.data.filter(product => 
      product.categories.some(pc => categoryIds.includes(pc.category.id) && product.id !== productIdToExclude)
    );
    const limitedRelatedProducts = products.slice(0, limit);
    const domainProducts:Product[] = [];
    for (const product of limitedRelatedProducts) {
      domainProducts.push(new Product(
        product.id,
        product.name,
        product.description,
        product.specificationGroups,
        product.condition,
        product.isReturnable,
        product.creationDate,
        product.warranty,
        product.status,
        product.reviewScore,
        product.photos,
        product.reviews,
        product.categories
      ));
    }
    return domainProducts;
  }
}
