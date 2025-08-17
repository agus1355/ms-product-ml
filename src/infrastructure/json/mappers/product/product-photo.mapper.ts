import { ProductPhoto } from 'src/domain/models/product/product-photo';

export function toDomainProductPhoto(raw: any): ProductPhoto {
  return new ProductPhoto(raw.id, raw.url, raw.description, raw.order, raw.type);
}

export function toPersistenceProductPhoto(photo: ProductPhoto): any {
  return {
    id: photo.id,
    url: photo.url,
    description: photo.description,
    order: photo.order,
    type: photo.type,
  };
}
