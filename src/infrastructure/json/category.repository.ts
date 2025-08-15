import { Injectable } from '@nestjs/common';
import { Review } from 'src/domain/models/review/review';
import { JsonRepository } from './json.repository';
import { Category } from 'src/domain/models/category';

@Injectable()
export class CategoryRepository extends JsonRepository<Category> {
  constructor() {
    super('src/infrastructure/json/data/reviews.json');
  }
}
