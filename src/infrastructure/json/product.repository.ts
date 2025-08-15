import { Injectable } from "@nestjs/common";
import { Product } from "src/domain/models/product/product";
import { JsonRepository } from "./json.repository";
import { IProductRepository } from "src/application/ports/product.repository.interface";

@Injectable()
export class ProductRepository extends JsonRepository<Product> implements IProductRepository {
  constructor() {
    super('src/infrastructure/json/data/products.json');
  }
}
