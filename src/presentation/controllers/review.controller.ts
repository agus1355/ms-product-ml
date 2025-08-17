import { Controller, Get, Param } from '@nestjs/common';
import { ReviewVM } from '../view-models/review/review.vm';
import { ReviewUseCases } from 'src/application/use-cases/review.use-cases';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller()
export class ReviewController {
  constructor(private readonly reviewUseCases: ReviewUseCases) {}

  @Get('products/:id/reviews')
  @ApiOperation({ summary: 'Get reviews for a product' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the product', type: Number })
  @ApiResponse({ status: 200, description: 'A list of reviews for the product.', type: [ReviewVM] })
  @ApiResponse({ status: 404, description: 'Product with the given ID not found.' })
  async getReviewsByProduct(@Param('id', PositiveIntPipe) id: number): Promise<ReviewVM[]> {
    const reviews = await this.reviewUseCases.getReviewsByProductId(id);
    return reviews.map((r) => new ReviewVM(r));
  }
}