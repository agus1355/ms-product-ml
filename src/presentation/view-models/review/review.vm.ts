import { ApiProperty } from "@nestjs/swagger";
import { Review } from "src/domain/models/review/review";
import { ReviewPhotoVM } from "./review.photo.vm";

export class ReviewVM {
  @ApiProperty({ example: 5, description: 'The score of the review' })
  score: number;

  @ApiProperty({ example: 'This is a great product!', description: 'The description of the review' })
  description: string;

  @ApiProperty({ example: '2023-05-18T10:00:00Z', description: 'The date of the review' })
  date: string;

  @ApiProperty({ type: () => [ReviewPhotoVM], description: 'The photos of the review' })
  photos: ReviewPhotoVM[];

  constructor(review: Review) {
    this.score = review.score;
    this.description = review.description;
    this.date = review.date.toISOString();
    this.photos = review.photos?.map((p) => new ReviewPhotoVM(p)) || [];
  }
}