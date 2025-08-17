import { Review } from 'src/domain/models/review/review';

export function toDomainReview(raw: any): Review {
  return new Review(
    raw.id,
    raw.score,
    raw.description,
    new Date(raw.date),
    raw.photos || [],
    raw.productId,
  );
}

export function toPersistenceReview(review: Review): any {
  return {
    id: review.id,
    score: review.score,
    description: review.description,
    date: review.date,
    photos: review.photos,
    productId: review.productId,
  };
}
