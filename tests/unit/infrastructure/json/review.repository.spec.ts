import { ReviewRepository } from 'src/infrastructure/json/review.repository';
import { Review } from 'src/domain/models/review/review';
import * as fs from 'fs';

jest.mock('fs');

describe('ReviewRepository', () => {
  let repository: ReviewRepository;

  const mockData = [
    { id: 1, productId: 1, score: 5, description: 'Review 1' },
    { id: 2, productId: 1, score: 4, description: 'Review 2' },
    { id: 3, productId: 2, score: 3, description: 'Review 3' },
  ];

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
    repository = new ReviewRepository();
  });

  describe('findByProductId', () => {
    it('should return reviews for a given product id', () => {
      const productId = 1;
      const reviews = repository.findByProductId(productId);
      expect(reviews).toHaveLength(2);
      expect(reviews[0]).toBeInstanceOf(Review);
    });

    it('should return an empty array if no reviews are found', () => {
        const productId = 99;
        const reviews = repository.findByProductId(productId);
        expect(reviews).toHaveLength(0);
    });
  });
});
