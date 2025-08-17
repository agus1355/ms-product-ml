import { Review } from 'src/domain/models/review/review';
import { toDomainReview, toPersistenceReview } from 'src/infrastructure/json/mappers/product/review.mapper';

describe('ReviewMapper', () => {
    const rawReview = {
        id: 1,
        score: 5,
        description: 'Test Review',
        date: new Date().toISOString(),
        photos: [],
        productId: 1,
    };

    describe('toDomainReview', () => {
        it('should map a raw object to a Review domain model', () => {
            const review = toDomainReview(rawReview);
            expect(review).toBeInstanceOf(Review);
            expect(review.id).toBe(rawReview.id);
            expect(review.score).toBe(rawReview.score);
        });
    });

    describe('toPersistenceReview', () => {
        it('should map a Review domain model to a raw object', () => {
            const review = new Review(
                1,
                5,
                'Test Review',
                new Date(),
                [],
                1
            );
            const raw = toPersistenceReview(review);
            expect(raw.id).toBe(review.id);
            expect(raw.score).toBe(review.score);
        });
    });
});
