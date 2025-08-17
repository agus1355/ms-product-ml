import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { GetProductVM } from '../view-models/product/get-product.vm';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { GetPreviewProductVM } from '../view-models/preview-product/get-preview-product.vm';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productUseCases: ProductUseCases) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by its unique ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the product', type: Number })
  @ApiResponse({ status: 200, description: 'The requested product.', type: GetProductVM })
  @ApiResponse({ status: 404, description: 'Product with the given ID not found.' })
  async getProductById(@Param('id', PositiveIntPipe) id: number): Promise<GetProductVM> {
    const product = await this.productUseCases.getProductById(id);
    return new GetProductVM(product);
  }

  @Get(':id/related')
  @ApiOperation({ summary: 'Get related products for a given product' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the product', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'The maximum number of related products to return', type: Number })
  @ApiResponse({ status: 200, description: 'A list of related products.', type: [GetPreviewProductVM] })
  @ApiResponse({ status: 404, description: 'Product with the given ID not found.' })
  async getRelatedProductsByProductId(
    @Param('id', PositiveIntPipe) id: number,
    @Query('limit') limit: number = 5
  ): Promise<GetPreviewProductVM[]> {
    const relatedProducts = await this.productUseCases.getRelatedProductsByIdAndLimit(id, limit);
    return relatedProducts.map(relatedProduct => new GetPreviewProductVM(relatedProduct));
  }
}
