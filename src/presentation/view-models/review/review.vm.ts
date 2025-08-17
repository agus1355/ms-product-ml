import { Review } from "src/domain/models/review/review";
import { ReviewPhotoVM } from "./review.photo.vm";

export class ReviewVM {
  score: number;
  description: string;
  date: string;
  photos: ReviewPhotoVM[];

  constructor(review: Review) {
    this.score = review.score;
    this.description = review.description;
    this.date = review.date.toISOString();
    this.photos = review.photos?.map((p) => new ReviewPhotoVM(p)) || [];
  }
}