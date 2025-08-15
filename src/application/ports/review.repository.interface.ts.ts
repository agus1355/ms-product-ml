import { IRepository } from "./repository.interface";
import { Review } from "src/domain/models/review/review";


export interface IReviewRepository extends IRepository<Review> {
    findByProductId(productId: number): Review[] | null;
}
