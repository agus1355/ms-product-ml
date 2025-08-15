import { ProductPhoto } from "src/domain/models/product/product-photo";

export class ProductPhotoVM {
  url: string;

  constructor(photo: ProductPhoto) {
    this.url = photo.url;
  }
}