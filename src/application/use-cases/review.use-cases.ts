import { Injectable } from '@nestjs/common';
import { Review } from 'src/domain/models/review/review';
import { ReviewService } from 'src/domain/services/review.service';

@Injectable()
export class ReviewUseCases {
    constructor(
        private readonly reviewService: ReviewService
    ) {}

    async getReviewsByProductId(productId: number): Promise<Review[]>{
        return this.reviewService.getReviewsByProductId(productId);
    }
}