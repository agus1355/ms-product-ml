import { ProductCategory } from 'src/domain/models/product/product-category';
import { CategoryVM } from './category.vm';

export class ProductCategoryVM {
  ranking: number;
  category: CategoryVM;

  constructor(pc: ProductCategory) {
    this.ranking = pc.ranking;
    this.category = new CategoryVM(pc.category);
  }
}
