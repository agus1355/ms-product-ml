import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/domain/models/product/product";
import { ProductCategoryVM } from "./product-category.vm";
import { SpecificationGroupVM } from "./specification-group.vm";
import { SellerVM } from "../common/seller.vm";
import { ProductPhotoVM } from "./product.photo.vm";

export class GetProductVM {
  @ApiProperty({ example: 1, description: 'The unique identifier of the product' })
  id: number;

  @ApiProperty({ example: 'Apple iPhone 13 Pro', description: 'The name of the product' })
  name: string;

  @ApiProperty({ example: 'The latest iPhone model with a stunning ProMotion display.', description: 'A brief description of the product' })
  description: string;

  @ApiProperty({ example: 'New', description: 'The condition of the product' })
  condition: string;

  @ApiProperty({ example: true, description: 'Indicates if the product is returnable' })
  isReturnable: boolean;

  @ApiProperty({ example: '2023-05-18T10:00:00Z', description: 'The date the product was created' })
  creationDate: string;

  @ApiProperty({ example: '1 year', description: 'The warranty information for the product' })
  warranty: string;

  @ApiProperty({ example: 'Active', description: 'The status of the product' })
  status: string;

  @ApiProperty({ example: 4.5, description: 'The average review score for the product' })
  reviewScore: number;

  @ApiProperty({ type: () => [SpecificationGroupVM], description: 'The specification groups for the product' })
  specificationGroups: SpecificationGroupVM[];

  @ApiProperty({ type: () => [ProductCategoryVM], description: 'The categories the product belongs to' })
  categories: ProductCategoryVM[];

  //seller: SellerVM;

  @ApiProperty({ type: () => [ProductPhotoVM], description: 'The photos of the product' })
  photos: ProductPhotoVM[];

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.condition = product.condition;
    this.isReturnable = product.isReturnable;
    this.creationDate = product.creationDate.toString();
    this.warranty = product.warranty?.duration + " " + product.warranty?.unit;
    this.status = product.status;
    this.reviewScore = product.reviewScore;
    this.specificationGroups = (product.specificationGroups).map((g) => new SpecificationGroupVM(g));
    this.categories = (product.categories).map((c) => new ProductCategoryVM(c));
    //this.seller = new SellerVM(product.seller);
    this.photos = (product.photos).map((p) => new ProductPhotoVM(p));
  }
}
