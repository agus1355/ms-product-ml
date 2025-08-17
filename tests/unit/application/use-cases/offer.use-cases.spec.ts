import { Test, TestingModule } from '@nestjs/testing';
import { OfferUseCases } from 'src/application/use-cases/offer.use-cases';
import { OfferService } from 'src/domain/services/offer.service';
import { Offer } from 'src/domain/models/offer/offer';
import { OfferType } from 'src/domain/enums/offer-type';
import { Price } from 'src/domain/models/price';
import { OfferStatus } from 'src/domain/enums/offer-status';
import { Seller } from 'src/domain/models/offer/seller';

describe('OfferUseCases', () => {
  let useCases: OfferUseCases;
  let service: OfferService;

  let mockOfferService;

  const mockSeller = new Seller(1, 'Test Seller', 5, true);

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
    mockOfferService = {
        getOffersByProductIdAndOfferTypes: jest.fn(),
        getAllOffersByProductId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferUseCases,
        {
          provide: OfferService,
          useValue: mockOfferService,
        },
      ],
    }).compile();

    useCases = module.get<OfferUseCases>(OfferUseCases);
    service = module.get<OfferService>(OfferService);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  describe('getOffersByProductIdAndOfferTypes', () => {
    it('should call getOffersByProductIdAndOfferTypes from service when offerTypes are provided', async () => {
      const productId = 1;
      const offerTypes = [OfferType.BEST_PRICE];
      const offers = [offerFactory(productId, OfferType.BEST_PRICE, 100)];
      mockOfferService.getOffersByProductIdAndOfferTypes.mockResolvedValue(offers);

      const result = await useCases.getOffersByProductIdAndOfferTypes(productId, offerTypes);

      expect(result).toEqual(offers);
      expect(service.getOffersByProductIdAndOfferTypes).toHaveBeenCalledWith(productId, offerTypes, undefined);
      expect(service.getAllOffersByProductId).not.toHaveBeenCalled();
    });

    it('should call getAllOffersByProductId from service when offerTypes are not provided', async () => {
        const productId = 1;
        const offers = [offerFactory(productId, OfferType.BEST_PRICE, 100)];
        mockOfferService.getAllOffersByProductId.mockResolvedValue(offers);

        const result = await useCases.getOffersByProductIdAndOfferTypes(productId, []);

        expect(result).toEqual(offers);
        expect(service.getAllOffersByProductId).toHaveBeenCalledWith(productId, undefined);
        expect(service.getOffersByProductIdAndOfferTypes).not.toHaveBeenCalled();
      });
  });
});
