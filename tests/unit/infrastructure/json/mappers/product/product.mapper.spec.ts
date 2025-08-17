import { Product } from 'src/domain/models/product/product';
import { toDomainProduct, toPersistenceProduct } from 'src/infrastructure/json/mappers/product/product.mapper';
import * as productPhotoMapper from 'src/infrastructure/json/mappers/product/product-photo.mapper';
import * as productCategoryMapper from 'src/infrastructure/json/mappers/product/product-category.mapper';
import * as warrantyMapper from 'src/infrastructure/json/mappers/product/warranty.mapper';

jest.mock('src/infrastructure/json/mappers/product/product-photo.mapper');
jest.mock('src/infrastructure/json/mappers/product/product-category.mapper');
jest.mock('src/infrastructure/json/mappers/product/warranty.mapper');

describe('ProductMapper (in product dir)', () => {
  const rawProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    specificationGroups: [],
    condition: 'new',
    isReturnable: true,
    creationDate: new Date().toISOString(),
    status: 'active',
    reviewScore: 4.5,
    photos: [{}],
    reviews: [],
    categories: [{}],
    warranty: {},
  };

  describe('toDomainProduct', () => {
    it('should map a raw object to a Product domain model', () => {
      const mockedPhoto = { id: 1, url: 'test.jpg', isMain: true };
      const mockedCategory = { id: 1, name: 'Test Category' };
      const mockedWarranty = { months: 12, description: 'Test Warranty' };

      (productPhotoMapper.toDomainProductPhoto as jest.Mock).mockReturnValue(mockedPhoto);
      (productCategoryMapper.toDomainProductCategory as jest.Mock).mockReturnValue(mockedCategory);
      (warrantyMapper.toDomainWarranty as jest.Mock).mockReturnValue(mockedWarranty);

      const product = toDomainProduct(rawProduct);

      expect(product).toBeInstanceOf(Product);
      expect(product.id).toBe(rawProduct.id);
      expect(product.name).toBe(rawProduct.name);
      expect(product.photos[0]).toEqual(mockedPhoto);
      expect(product.categories[0]).toEqual(mockedCategory);
      expect(product.warranty).toEqual(mockedWarranty);
    });
  });

  describe('toPersistenceProduct', () => {
    it('should map a Product domain model to a raw object', () => {
        const product = new Product(
            1, 'Test Product', 'desc', [], 'new', true, new Date(), 'active', 5, [], [], [], undefined, undefined
        );

      const raw = toPersistenceProduct(product);

      expect(raw.id).toBe(product.id);
      expect(raw.name).toBe(product.name);
    });
  });
});
