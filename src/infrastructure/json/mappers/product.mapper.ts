import { Product } from 'src/domain/models/product/product';
import { toDomainProductPhoto } from './product/product-photo.mapper';
import { toDomainProductCategory } from './product/product-category.mapper';
import { toDomainWarranty } from './product/warranty.mapper';

export function toDomainProduct(raw: any): Product {
  const photos = (raw.photos || []).map(toDomainProductPhoto);
  const categories = (raw.categories || []).map(toDomainProductCategory);
  const warranty = raw.warranty ? toDomainWarranty(raw.warranty) : undefined;
  const reviews = raw.reviews || [];
  const specificationGroups = raw.specificationGroups || [];

  return new Product(
    raw.id,
    raw.name,
    raw.description,
    specificationGroups,
    raw.condition,
    raw.isReturnable,
    new Date(raw.creationDate),
    raw.status,
    raw.reviewScore,
    photos,
    reviews,
    categories,
    warranty
  );
}

export function toPersistenceProduct(product: Product): any {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    specificationGroups: product.specificationGroups,
    condition: product.condition,
    isReturnable: product.isReturnable,
    creationDate: product.creationDate.toISOString(),
    warranty: product.warranty,
    status: product.status,
    reviewScore: product.reviewScore,
    photos: product.photos,
    reviews: product.reviews,
    categories: product.categories,
    // bestOffer: product.bestOffer ? product.bestOffer : null,
  };
}
