import { Product } from "src/domain/models/product/product";
import { ProductCategoryVM } from "./product-category.vm";
import { SpecificationGroupVM } from "./specification-group.vm";
import { SellerVM } from "../common/seller.vm";
import { ProductPhotoVM } from "./product.photo.vm";
import { ApiProperty } from '@nestjs/swagger';

export class GetProductVM {
  @ApiProperty({ example: 1, description: 'The unique identifier of the product' })
  id: number;

  @ApiProperty({ example: 'Apple iPhone 13 Pro', description: 'The name of the product' })
  name: string;
  description: string;
  condition: string;
  isReturnable: boolean;
  creationDate: string;
  warranty: string;
  status: string;
  reviewScore: number;
  specificationGroups: SpecificationGroupVM[];
  categories: ProductCategoryVM[];
  //seller: SellerVM;
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
