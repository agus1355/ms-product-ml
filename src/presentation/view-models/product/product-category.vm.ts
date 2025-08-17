import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from 'src/domain/models/product/product-category';
import { CategoryVM } from './category.vm';

export class ProductCategoryVM {
  @ApiProperty({ example: 1, description: 'The ranking of the category for the product' })
  ranking: number;

  @ApiProperty({ type: () => CategoryVM, description: 'The category details' })
  category: CategoryVM;

  constructor(pc: ProductCategory) {
    this.ranking = pc.ranking;
    this.category = new CategoryVM(pc.category);
  }
}
