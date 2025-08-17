import { ProductRepository } from 'src/infrastructure/json/product.repository';
import { Product } from 'src/domain/models/product/product';
import * as fs from 'fs';

jest.mock('fs');

describe('ProductRepository', () => {
  let repository: ProductRepository;

  const mockData = [
    { id: 1, name: 'Product 1', categories: [{ category: { id: 1 } }], photos: [] },
    { id: 2, name: 'Product 2', categories: [{ category: { id: 1 } }], photos: [] },
    { id: 3, name: 'Product 3', categories: [{ category: { id: 2 } }], photos: [] },
  ];

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
    repository = new ProductRepository();
  });

  describe('findProductById', () => {
    it('should return a product for a given id', async () => {
      const productId = 1;
      const product = await repository.findProductById(productId);
      expect(product).toBeInstanceOf(Product);
      expect(product!.id).toBe(productId);
    });

    it('should return null if no product is found', async () => {
        const productId = 99;
        const product = await repository.findProductById(productId);
        expect(product).toBeNull();
    });
  });

  describe('findProductsByCategoriesIdAndLimit', () => {
    it('should return products matching the given category ids', async () => {
      const categoryIds = [1];
      const productIdToExclude = 1;
      const limit = 5;
      const products = await repository.findProductsByCategoriesIdAndLimit(categoryIds, productIdToExclude, limit);
      expect(products).toHaveLength(1);
      expect(products[0].id).toBe(2);
    });

    it('should respect the limit', async () => {
        const categoryIds = [1];
        const productIdToExclude = 3;
        const limit = 1;
        const products = await repository.findProductsByCategoriesIdAndLimit(categoryIds, productIdToExclude, limit);
        expect(products).toHaveLength(1);
    });
  });
});
