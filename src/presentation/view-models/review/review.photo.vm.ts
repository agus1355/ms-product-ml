import { ApiProperty } from "@nestjs/swagger";
import { ReviewPhoto } from "src/domain/models/review/review-photo";

export class ReviewPhotoVM {
  @ApiProperty({ example: 'https://example.com/review-photo.jpg', description: 'The URL of the review photo' })
  url: string;

  constructor(photo: ReviewPhoto) {
    this.url = photo.url;
  }
}