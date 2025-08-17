import { Seller } from "src/domain/models/offer/seller";

export class SellerVM {
  name: string;
  score: number;
  isVerified: boolean;

  constructor(seller: Seller) {
    this.name = seller.name;
    this.score = seller.score;
    this.isVerified = seller.isVerified;
  }
}
