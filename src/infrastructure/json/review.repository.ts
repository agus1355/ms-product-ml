import { Injectable } from '@nestjs/common';
import { Review } from 'src/domain/models/review/review';
import { JsonRepository } from './json.repository';
import { IReviewRepository } from 'src/application/ports/review.repository.interface.ts';
import { toDomainReview, toPersistenceReview } from './mappers/review.mapper';

@Injectable()
export class ReviewRepository extends JsonRepository<Review> implements IReviewRepository {
  constructor() {
    super('src/infrastructure/json/data/reviews.json', toDomainReview, toPersistenceReview);
  }

  findByProductId(productId: number): Review[] {
    const rawReviews = (this.data as any[]).filter((p) => p.productId === productId);
    return rawReviews.map(this.mapToDomain);
  }
}
