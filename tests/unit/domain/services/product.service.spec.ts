import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from 'src/domain/services/product.service';
import { IProductRepository } from 'src/application/ports/product.repository.interface';
import { TOKENS } from 'src/application/tokens';
import { Product } from 'src/domain/models/product/product';
import { ProductCategory } from 'src/domain/models/product/product-category';
import { Category } from 'src/domain/models/category';
import { ProductNotFoundException } from 'src/domain/exceptions/ProductNotFoundException';

describe('ProductService', () => {
  let service: ProductService;
  let repository: IProductRepository;

  const mockProductRepository = {
    findProductById: jest.fn(),
    findProductsByCategoriesIdAndLimit: jest.fn(),
  };

  const productFactory = (id: number, name: string) => {
    return new Product(
      id,
      name,
      'description',
      [],
      'new',
      true,
      new Date(),
      'active',
      5,
      [],
      [],
      [],
      undefined,
      undefined
    );
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: TOKENS.ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<IProductRepository>(TOKENS.ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProductById', () => {
    it('should return a product for a given id', async () => {
      const productId = 1;
      const product = productFactory(productId, 'Test Product');
      mockProductRepository.findProductById.mockResolvedValue(product);

      const result = await service.getProductById(productId);

      expect(result).toEqual(product);
      expect(repository.findProductById).toHaveBeenCalledWith(productId);
    });

    it('should throw ProductNotFoundException when no product is found', async () => {
      const productId = 1;
      mockProductRepository.findProductById.mockResolvedValue(null);

      await expect(service.getProductById(productId)).rejects.toThrow(ProductNotFoundException);
    });
  });

  describe('getRelatedProductsByCategoriesAndLimit', () => {
    it('should return related products', async () => {
      const category = new Category(1, 'Test Category', null);
      const productCategory = new ProductCategory(1, category, 1, true);
      const productCategories = [productCategory];
      const productIdToExclude = 1;
      const limit = 5;
      const relatedProducts = [
        productFactory(2, 'Related Product 1'),
        productFactory(3, 'Related Product 2'),
      ];
      mockProductRepository.findProductsByCategoriesIdAndLimit.mockResolvedValue(relatedProducts);

      const result = await service.getRelatedProductsByCategoriesAndLimit(productCategories, productIdToExclude, limit);

      expect(result).toEqual(relatedProducts);
      expect(repository.findProductsByCategoriesIdAndLimit).toHaveBeenCalledWith([category.id], productIdToExclude, limit);
    });
  });
});
