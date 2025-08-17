import { Test, TestingModule } from '@nestjs/testing';
import { ProductUseCases } from 'src/application/use-cases/product.use-cases';
import { ProductService } from 'src/domain/services/product.service';
import { OfferService } from 'src/domain/services/offer.service';
import { Product } from 'src/domain/models/product/product';
import { Offer } from 'src/domain/models/offer/offer';
import { Price } from 'src/domain/models/price';
import { OfferStatus } from 'src/domain/enums/offer-status';
import { Seller } from 'src/domain/models/offer/seller';
import { OfferType } from 'src/domain/enums/offer-type';

describe('ProductUseCases', () => {
  let useCases: ProductUseCases;
  let productService: ProductService;
  let offerService: OfferService;

  let mockProductService;
  let mockOfferService;

  const mockSeller = new Seller(1, 'Test Seller', 5, true);

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

  const offerFactory = (productId: number, offerType: OfferType, amount: number) => {
    const price = new Price('USD', amount);
    return new Offer(
        price,
        price,
        null,
        null,
        null,
        new Date(),
        OfferStatus.ENABLE,
        10,
        offerType,
        [],
        mockSeller,
        productId,
    );
  }

  beforeEach(async () => {
    mockProductService = {
      getProductById: jest.fn(),
      getRelatedProductsByCategoriesAndLimit: jest.fn(),
    };
    mockOfferService = {
      getBestPricedOfferByProductId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductUseCases,
        { provide: ProductService, useValue: mockProductService },
        { provide: OfferService, useValue: mockOfferService },
      ],
    }).compile();

    useCases = module.get<ProductUseCases>(ProductUseCases);
    productService = module.get<ProductService>(ProductService);
    offerService = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  describe('getProductById', () => {
    it('should call getProductById from product service', async () => {
      const productId = 1;
      const product = productFactory(productId, 'Test Product');
      mockProductService.getProductById.mockResolvedValue(product);

      const result = await useCases.getProductById(productId);

      expect(result).toEqual(product);
      expect(productService.getProductById).toHaveBeenCalledWith(productId);
    });
  });

  describe('getRelatedProductsByIdAndLimit', () => {
    it('should return related products with their best offers', async () => {
      const productId = 1;
      const limit = 5;
      const product = productFactory(productId, 'Test Product');
      const relatedProducts = [
        productFactory(2, 'Related Product 1'),
        productFactory(3, 'Related Product 2'),
      ];
      const bestOffer1 = offerFactory(2, OfferType.BEST_PRICE, 100);
      const bestOffer2 = offerFactory(3, OfferType.BEST_PRICE, 120);

      mockProductService.getProductById.mockResolvedValue(product);
      mockProductService.getRelatedProductsByCategoriesAndLimit.mockResolvedValue(relatedProducts);
      mockOfferService.getBestPricedOfferByProductId.mockImplementation((id) => {
        if (id === 2) return Promise.resolve(bestOffer1);
        if (id === 3) return Promise.resolve(bestOffer2);
        return Promise.resolve(null);
      });

      const result = await useCases.getRelatedProductsByIdAndLimit(productId, limit);

      expect(productService.getProductById).toHaveBeenCalledWith(productId);
      expect(productService.getRelatedProductsByCategoriesAndLimit).toHaveBeenCalledWith(product.categories, productId, limit);
      expect(offerService.getBestPricedOfferByProductId).toHaveBeenCalledWith(2);
      expect(offerService.getBestPricedOfferByProductId).toHaveBeenCalledWith(3);
      expect(result[0].bestOffer).toEqual(bestOffer1);
      expect(result[1].bestOffer).toEqual(bestOffer2);
    });
  });
});
