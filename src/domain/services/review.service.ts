import { Inject, Injectable } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { IReviewRepository } from 'src/application/ports/review.repository.interface.ts';
import { Review } from '../models/review/review';

@Injectable()
export class ReviewService {
    constructor(
        @Inject(TOKENS.ReviewRepository)
        private readonly reviewRepository: IReviewRepository
    ) {}

    async getReviewsByProductId(productId: number): Promise<Review[]> {
        return this.reviewRepository.findBy({ productId });
    }
}
