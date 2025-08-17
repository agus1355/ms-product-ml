import { ApiProperty } from "@nestjs/swagger";
import { ProductPhoto } from "src/domain/models/product/product-photo";

export class ProductPhotoVM {
  @ApiProperty({ example: 'https://example.com/photo.jpg', description: 'The URL of the product photo' })
  url: string;

  constructor(photo: ProductPhoto) {
    this.url = photo.url;
  }
}