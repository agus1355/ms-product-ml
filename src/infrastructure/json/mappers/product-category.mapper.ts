import { ProductCategory } from 'src/domain/models/product/product-category';
import { Category } from 'src/domain/models/category';

export function toDomainProductCategory(raw: any): ProductCategory {
  const category = new Category(raw.category.id, raw.category.name, raw.category.parentId);
  return new ProductCategory(raw.id, category, raw.ranking, raw.isMostSpecific);
}

export function toPersistenceProductCategory(pc: ProductCategory): any {
  return { id: pc.id, category: { id: pc.category.id, name: pc.category.name, parentId: pc.category.parentId }, ranking: pc.ranking, isMostSpecific: pc.isMostSpecific };
}
