import { ProductPhoto } from "./product-photo";
import { ProductCategory } from "./product-category";
import { Review } from "../review/review";
import { Seller } from "../seller";
import { SpecificationGroup } from "../specifications/specification-group";
import { Warranty } from "./warranty";

export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly specificationGroups: SpecificationGroup[],
    public readonly condition: string,
    public readonly isReturnable: boolean,
    public readonly creationDate: Date,
    public readonly warranty: Warranty,
    public readonly status: string,
    public readonly reviewScore: number,
    public readonly photos: ProductPhoto[],
    public readonly reviews: Review[] = [],
    public readonly categories: ProductCategory[] = [],
    public readonly seller: Seller,
  ) {}
}
