import { Product } from 'src/domain/models/product/product';

export function toDomainProduct(raw: any): Product {
  return new Product(
    raw.id,
    raw.name,
    raw.description,
    raw.specificationGroups,
    raw.condition,
    raw.isReturnable,
    new Date(raw.creationDate),
    raw.warranty,
    raw.status,
    raw.reviewScore,
    raw.photos,
    raw.reviews,
    raw.categories,
    raw.bestOffers || []
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
    bestOffers: product.bestOffers,
  };
}
