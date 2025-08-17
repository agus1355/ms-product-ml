import { Test, TestingModule } from '@nestjs/testing';
import { OfferService } from 'src/domain/services/offer.service';
import { IOfferRepository } from 'src/application/ports/offer.repository.interface';
import { TOKENS } from 'src/application/tokens';
import { Offer } from 'src/domain/models/offer/offer';
import { OfferType } from 'src/domain/enums/offer-type';
import { OfferNotFoundException } from 'src/domain/exceptions/OfferNotFoundException';
import { Price } from 'src/domain/models/price';
import { OfferStatus } from 'src/domain/enums/offer-status';
import { Seller } from 'src/domain/models/offer/seller';

describe('OfferService', () => {
  let service: OfferService;
  let repository: IOfferRepository;

  const mockOfferRepository = {
    findByProductIdAndOfferTypes: jest.fn(),
    findBy: jest.fn(),
    findBestPriceOfferByProductId: jest.fn(),
  };

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferService,
        {
          provide: TOKENS.OfferRepository,
          useValue: mockOfferRepository,
        },
      ],
    }).compile();

    service = module.get<OfferService>(OfferService);
    repository = module.get<IOfferRepository>(TOKENS.OfferRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOffersByProductIdAndOfferTypes', () => {
    it('should return offers for a given product id and offer types', async () => {
      const productId = 1;
      const offerTypes = [OfferType.BEST_PRICE, OfferType.BEST_INSTALLMENTS];
      const offers = [
        offerFactory(productId, OfferType.BEST_PRICE, 100),
      ];
      mockOfferRepository.findByProductIdAndOfferTypes.mockResolvedValue(offers);

      const result = await service.getOffersByProductIdAndOfferTypes(productId, offerTypes);

      expect(result).toEqual(offers);
      expect(repository.findByProductIdAndOfferTypes).toHaveBeenCalledWith(productId, offerTypes);
    });

    it('should throw OfferNotFoundException when no offers are found', async () => {
      const productId = 1;
      const offerTypes = [OfferType.BEST_PRICE];
      mockOfferRepository.findByProductIdAndOfferTypes.mockResolvedValue([]);

      await expect(service.getOffersByProductIdAndOfferTypes(productId, offerTypes)).rejects.toThrow(OfferNotFoundException);
    });

    it('should return a limited number of offers when limit is provided', async () => {
        const productId = 1;
        const offerTypes = [OfferType.BEST_PRICE, OfferType.BEST_INSTALLMENTS];
        const offers = [
            offerFactory(productId, OfferType.BEST_PRICE, 100),
            offerFactory(productId, OfferType.BEST_INSTALLMENTS, 120),
        ];
        mockOfferRepository.findByProductIdAndOfferTypes.mockResolvedValue(offers);

        const result = await service.getOffersByProductIdAndOfferTypes(productId, offerTypes, 1);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(offers[0]);
      });
  });

  describe('getAllOffersByProductId', () => {
    it('should return all offers for a given product id', async () => {
      const productId = 1;
      const offers = [
        offerFactory(productId, OfferType.BEST_PRICE, 100),
      ];
      mockOfferRepository.findBy.mockResolvedValue(offers);

      const result = await service.getAllOffersByProductId(productId);

      expect(result).toEqual(offers);
      expect(repository.findBy).toHaveBeenCalledWith({ productId });
    });

    it('should throw OfferNotFoundException when no offers are found', async () => {
      const productId = 1;
      mockOfferRepository.findBy.mockResolvedValue([]);

      await expect(service.getAllOffersByProductId(productId)).rejects.toThrow(OfferNotFoundException);
    });

    it('should return a limited number of offers when limit is provided', async () => {
        const productId = 1;
        const offers = [
            offerFactory(productId, OfferType.BEST_PRICE, 100),
            offerFactory(productId, OfferType.BEST_INSTALLMENTS, 120),
        ];
        mockOfferRepository.findBy.mockResolvedValue(offers);

        const result = await service.getAllOffersByProductId(productId, 1);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(offers[0]);
      });
  });

  describe('getBestPricedOfferByProductId', () => {
    it('should return the best priced offer for a given product id', async () => {
      const productId = 1;
      const bestOffer = offerFactory(productId, OfferType.BEST_PRICE, 80);
      mockOfferRepository.findBestPriceOfferByProductId.mockResolvedValue(bestOffer);

      const result = await service.getBestPricedOfferByProductId(productId);

      expect(result).toEqual(bestOffer);
      expect(repository.findBestPriceOfferByProductId).toHaveBeenCalledWith(productId);
    });

    it('should throw OfferNotFoundException when no offer is found', async () => {
      const productId = 1;
      mockOfferRepository.findBestPriceOfferByProductId.mockResolvedValue(null);

      await expect(service.getBestPricedOfferByProductId(productId)).rejects.toThrow(OfferNotFoundException);
    });
  });
});
