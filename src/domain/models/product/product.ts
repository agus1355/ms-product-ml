import { ProductPhoto } from "./product-photo";
import { ProductCategory } from "./product-category";
import { Review } from "../review/review";
import { SpecificationGroup } from "../specifications/specification-group";
import { Warranty } from "./warranty";
import { Offer } from "../offer";

export class Product {
  public readonly bestOffers: Offer[] = [];
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly specificationGroups: SpecificationGroup[],
    public readonly condition: string,
    public readonly isReturnable: boolean,
    public readonly creationDate: Date,
    public readonly status: string,
    public readonly reviewScore: number,
    public readonly photos: ProductPhoto[],
    public readonly reviews: Review[] = [],
    public readonly categories: ProductCategory[] = [],
    public readonly warranty?: Warranty,
    bestOffers?: Offer[]
  ) {
    this.bestOffers = bestOffers || [];
  }
}
