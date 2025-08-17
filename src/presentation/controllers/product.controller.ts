import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { GetProductVM } from '../view-models/product/get-product.vm';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { GetPreviewProductVM } from '../view-models/preview-product/get-preview-product.vm';
@Controller('products')
export class ProductController {
    constructor(private readonly productUseCases: ProductUseCases) {}

  @Get(':id')
  async getProductById(@Param('id', PositiveIntPipe) id: number): Promise<GetProductVM> {
    const product = await this.productUseCases.getProductById(id);
    return new GetProductVM(product);
  }

  @Get(':id/related')
  async getRelatedProductsByProductId(
    @Param('id', PositiveIntPipe) id: number,
    @Query('limit') limit: number = 5
  ): Promise<GetPreviewProductVM[]> {
    const relatedProducts = await this.productUseCases.getRelatedProductsByIdAndLimit(id, limit);
    return relatedProducts.map(relatedProduct => new GetPreviewProductVM(relatedProduct));
  }
}
