import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKENS } from 'src/application/tokens';
import { ICategoryRepository } from 'src/application/ports/category.repository.interface';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    constructor(
        @Inject(TOKENS.CategoryRepository)
        private readonly categoryRepository: ICategoryRepository
    ) {}

    async getCategoryById(categoryId: number): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id: categoryId });
        if (!category) {
            throw new NotFoundException(`Category not found`);
        }
        return category;
    }
}
