import { ApiProperty } from "@nestjs/swagger";
import { Seller } from "src/domain/models/offer/seller";

export class SellerVM {
  @ApiProperty({ example: 'BestSellers Inc.', description: 'The name of the seller' })
  name: string;

  @ApiProperty({ example: 4.8, description: 'The score of the seller' })
  score: number;

  @ApiProperty({ example: true, description: 'Indicates if the seller is verified' })
  isVerified: boolean;

  constructor(seller: Seller) {
    this.name = seller.name;
    this.score = seller.score;
    this.isVerified = seller.isVerified;
  }
}
