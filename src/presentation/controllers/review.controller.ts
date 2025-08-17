import { Controller, Get, Param } from '@nestjs/common';
import { ReviewVM } from '../view-models/review/review.vm';
import { ReviewUseCases } from 'src/application/use-cases/review.use-cases';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';

@Controller()
export class ReviewController {
  constructor(private readonly reviewUseCases: ReviewUseCases) {}

  @Get('products/:id/reviews')
  async getReviewsByProduct(@Param('id', PositiveIntPipe) id: number): Promise<ReviewVM[]> {
    const reviews = await this.reviewUseCases.getReviewsByProductId(id);
    return reviews.map((r) => new ReviewVM(r));
  }
}