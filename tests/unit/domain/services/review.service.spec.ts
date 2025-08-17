import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from 'src/domain/services/review.service';
import { IReviewRepository } from 'src/application/ports/review.repository.interface.ts';
import { TOKENS } from 'src/application/tokens';
import { Review } from 'src/domain/models/review/review';

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: IReviewRepository;

  const mockReviewRepository = {
    findBy: jest.fn(),
  };

  const reviewFactory = (id: number, productId: number) => {
    return new Review(
      id,
      5,
      'Test review',
      new Date(),
      [],
      productId
    );
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: TOKENS.ReviewRepository,
          useValue: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repository = module.get<IReviewRepository>(TOKENS.ReviewRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getReviewsByProductId', () => {
    it('should return reviews for a given product id', async () => {
      const productId = 1;
      const reviews = [
        reviewFactory(1, productId),
        reviewFactory(2, productId),
      ];
      mockReviewRepository.findBy.mockResolvedValue(reviews);

      const result = await service.getReviewsByProductId(productId);

      expect(result).toEqual(reviews);
      expect(repository.findBy).toHaveBeenCalledWith({ productId });
    });

    it('should return an empty array when no reviews are found', async () => {
        const productId = 1;
        mockReviewRepository.findBy.mockResolvedValue([]);

        const result = await service.getReviewsByProductId(productId);

        expect(result).toEqual([]);
        expect(repository.findBy).toHaveBeenCalledWith({ productId });
      });
  });
});
