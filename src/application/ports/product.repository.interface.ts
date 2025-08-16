import { Product } from "src/domain/models/product/product";
import { IRepository } from "./repository.interface";


export interface IProductRepository extends IRepository<Product> {
    findProductsByCategoriesIdAndLimit(categoryIds: number[], productIdToExclude:number, limit: number): Promise<Product[]>;
}
