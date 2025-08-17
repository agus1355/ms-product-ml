import { ProductPhoto } from "./product-photo";
import { ProductCategory } from "./product-category";
import { Review } from "../review/review";
import { SpecificationGroup } from "../specifications/specification-group";
import { Warranty } from "./warranty";
import { Offer } from "../offer/offer";
import { OfferNotFoundException } from "src/domain/exceptions/OfferNotFoundException";

export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly specificationGroups: SpecificationGroup[],
    public readonly condition: string,
    public readonly isReturnable: boolean,
    public readonly creationDate: Date,
    public readonly status: string,
    public reviewScore: number,
    public readonly photos: ProductPhoto[],
    public readonly reviews: Review[] = [],
    public readonly categories: ProductCategory[] = [],
    public readonly warranty?: Warranty,
    public bestOffer?: Offer
  ) {
    // this.bestOffers = bestOffers || [];
  }

  public getBestOffer(): Offer {
    if (!this.bestOffer) {
      throw new OfferNotFoundException();
    }
    return this.bestOffer;
  }

  public calculateReviewScore(): number {
    if (this.reviews.length === 0) {
      this.reviewScore = 0;
      return this.reviewScore;
    }
    const totalScore = this.reviews.reduce((sum, review) => sum + review.score, 0);
    this.reviewScore = totalScore / this.reviews.length;
    return this.reviewScore;
  }
}
