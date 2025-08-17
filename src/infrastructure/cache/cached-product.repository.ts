import { Injectable, Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IProductRepository } from 'src/application/ports/product.repository.interface';
import { Product } from 'src/domain/models/product/product';

@Injectable()
export class CachedProductRepository implements IProductRepository {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly fallback: IProductRepository,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.fallback.findAll();
  }

  async findBy(criteria: Partial<Product>): Promise<Product[]> {
    return this.fallback.findBy(criteria);
  }

  async findOneBy(criteria: Partial<Product>): Promise<Product | null> {
    return this.fallback.findOneBy(criteria);
  }

  async save(entity: Product): Promise<Product> {
    return this.fallback.save(entity);
  }

  async delete(criteria: Partial<Product>): Promise<void> {
    return this.fallback.delete(criteria);
  }

  async findProductById(productId: number): Promise<Product | null> {
    const key = `products:id:${productId}`;
    const cached = await this.cacheManager.get<Product>(key);
    if (cached) return cached;

    const result = await this.fallback.findOneBy({ id: productId });
    if (result) {
      await this.cacheManager.set(key, result);
    }
    return result;
  }

  async findProductsByCategoriesIdAndLimit(categoryIds: number[], productIdToExclude: number, limit: number): Promise<Product[]> {
    const key = `products:categories:${categoryIds.join(',')}:exclude:${productIdToExclude}:limit:${limit}`;
    const cached = await this.cacheManager.get<Product[]>(key);
    if (cached) return cached;

    const result = await this.fallback.findProductsByCategoriesIdAndLimit(categoryIds, productIdToExclude, limit);
    if (result && result.length) {
      await this.cacheManager.set<Product[]>(key, result);
    }
    return result;
  }
}
