import { Offer } from "src/domain/models/offer/offer";
import { IRepository } from "./repository.interface";


export interface IOfferRepository extends IRepository<Offer> {
    findBestPriceOfferByProductId(productId: number): Promise<Offer | null>;
    findByProductIdAndOfferTypes(productId: number, offerTypes: string[]): Promise<Offer[]>;
}

