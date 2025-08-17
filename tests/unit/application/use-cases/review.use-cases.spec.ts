import { Test, TestingModule } from '@nestjs/testing';
import { ReviewUseCases } from 'src/application/use-cases/review.use-cases';
import { ReviewService } from 'src/domain/services/review.service';
import { Review } from 'src/domain/models/review/review';

describe('ReviewUseCases', () => {
  let useCases: ReviewUseCases;
  let service: ReviewService;

  let mockReviewService;

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
    mockReviewService = {
      getReviewsByProductId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewUseCases,
        { provide: ReviewService, useValue: mockReviewService },
      ],
    }).compile();

    useCases = module.get<ReviewUseCases>(ReviewUseCases);
    service = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(useCases).toBeDefined();
  });

  describe('getReviewsByProductId', () => {
    it('should call getReviewsByProductId from review service', async () => {
      const productId = 1;
      const reviews = [
        reviewFactory(1, productId),
        reviewFactory(2, productId),
      ];
      mockReviewService.getReviewsByProductId.mockResolvedValue(reviews);

      const result = await useCases.getReviewsByProductId(productId);

      expect(result).toEqual(reviews);
      expect(service.getReviewsByProductId).toHaveBeenCalledWith(productId);
    });
  });
});
