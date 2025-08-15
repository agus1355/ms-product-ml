import { Injectable } from '@nestjs/common';
import { Review } from 'src/domain/models/review/review';
import { JsonRepository } from './json.repository';
import { IReviewRepository } from 'src/application/ports/review.repository.interface.ts';

@Injectable()
export class ReviewRepository extends JsonRepository<Review> implements IReviewRepository {
  constructor() {
    super('src/infrastructure/json/data/reviews.json');
  }

  findByProductId(productId: number): Review[] {
    const reviews = this.data.filter((p) => p.id === productId);
    if (!reviews) return [];
    return reviews;
  }
}
