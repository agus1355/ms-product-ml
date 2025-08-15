import { ReviewPhoto } from "./review-photo";

export class Review {
  constructor(
    public readonly id: number,
    public readonly score: number,
    public readonly description: string,
    public readonly date: Date,
    public readonly photos: ReviewPhoto[] = [],
    public readonly productId: number
  ) {}
}
