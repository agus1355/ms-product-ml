import { Module } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { ReviewController } from 'src/presentation/controllers/review.controller';
import { ReviewUseCases } from 'src/application/use-cases/review.use-cases';
import { ReviewRepository } from '../json/review.repository';
import { ReviewService } from 'src/domain/services/review.service';
@Module({
  controllers: [ReviewController],
  providers: [
    ReviewUseCases,
    ReviewService,
    { provide: TOKENS.ReviewRepository, useClass: ReviewRepository },
  ],
})
export class ReviewModule {}
