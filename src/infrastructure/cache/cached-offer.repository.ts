import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { IOfferRepository } from 'src/application/ports/offer.repository.interface';
import { Offer } from 'src/domain/models/offer/offer';

@Injectable()
export class CachedOfferRepository implements IOfferRepository {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly fallback: IOfferRepository,
  ) {}

  async findAll(): Promise<Offer[]> {
    return this.fallback.findAll();
  }

  async findBy(criteria: Partial<Offer>): Promise<Offer[]> {
    return this.fallback.findBy(criteria);
  }

  async findOneBy(criteria: Partial<Offer>): Promise<Offer | null> {
    return this.fallback.findOneBy(criteria);
  }

  async save(entity: Offer): Promise<Offer> {
    return this.fallback.save(entity);
  }

  async delete(criteria: Partial<Offer>): Promise<void> {
    return this.fallback.delete(criteria);
  }

  async findBestPriceOfferByProductId(productId: number): Promise<Offer | null> {
    const key = `offers:product:${productId}:bestPrice`;
    const cached = await this.cacheManager.get<Offer>(key);
    if (cached) return cached;

    const result = await this.fallback.findBestPriceOfferByProductId(productId);
    if (result) {
      await this.cacheManager.set(key, result);
    }
    return result;
  }

  async findByProductIdAndOfferTypes(productId: number, offerTypes: string[]): Promise<Offer[]> {
    const typesKey = offerTypes && offerTypes.length ? offerTypes.join(',') : 'all';
    const key = `offers:product:${productId}:types:${typesKey}`;
    const cached = await this.cacheManager.get<Offer[]>(key);
    if (cached){
      return cached;
    }
    const result = await this.fallback.findByProductIdAndOfferTypes(productId, offerTypes);
    if (result && result.length) {
      await this.cacheManager.set(key, result);
    }
    return result;
  }
}
