import { ReviewPhoto } from "src/domain/models/review/review-photo";

export class ReviewPhotoVM {
  url: string;

  constructor(photo: ReviewPhoto) {
    this.url = photo.url;
  }
}