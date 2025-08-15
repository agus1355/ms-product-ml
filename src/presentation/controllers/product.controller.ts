import { Controller, Get, Param } from '@nestjs/common';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { GetProductVM } from '../view-models/product/get-product.vm';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
@Controller('products')
export class ProductController {
    constructor(private readonly productUseCases: ProductUseCases) {}

    @Get(':id')
    async getProductById(@Param('id', PositiveIntPipe) id: number): Promise<GetProductVM> {
    const product = await this.productUseCases.getProductById(id);
    return new GetProductVM(product);
  }
}
