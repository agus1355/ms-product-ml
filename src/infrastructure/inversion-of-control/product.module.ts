import { Module } from '@nestjs/common';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { ProductController } from 'src/presentation/controllers/product.controller';
import { TOKENS } from 'src/application/tokens';
import { ProductRepository } from '../json/product.repository';
import { ProductService } from 'src/domain/services/product.service';
@Module({
  controllers: [ProductController],
  providers: [
    ProductUseCases,
    ProductService,
    { provide: TOKENS.ProductRepository, useClass: ProductRepository },
  ],
})
export class ProductModule {}
