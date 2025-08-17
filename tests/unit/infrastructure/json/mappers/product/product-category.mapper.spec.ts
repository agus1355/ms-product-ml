import { ProductCategory } from 'src/domain/models/product/product-category';
import { toDomainProductCategory, toPersistenceProductCategory } from 'src/infrastructure/json/mappers/product/product-category.mapper';
import { Category } from 'src/domain/models/category';

describe('ProductCategoryMapper', () => {
    const rawProductCategory = {
        id: 1,
        category: { id: 1, name: 'Test Category', parentId: null },
        ranking: 1,
        isMostSpecific: true,
    };

    describe('toDomainProductCategory', () => {
        it('should map a raw object to a ProductCategory domain model', () => {
            const productCategory = toDomainProductCategory(rawProductCategory);
            expect(productCategory).toBeInstanceOf(ProductCategory);
            expect(productCategory.id).toBe(rawProductCategory.id);
            expect(productCategory.category).toBeInstanceOf(Category);
        });
    });

    describe('toPersistenceProductCategory', () => {
        it('should map a ProductCategory domain model to a raw object', () => {
            const productCategory = new ProductCategory(
                1,
                new Category(1, 'Test Category', null),
                1,
                true
            );
            const raw = toPersistenceProductCategory(productCategory);
            expect(raw.id).toBe(productCategory.id);
            expect(raw.category.id).toBe(productCategory.category.id);
        });
    });
});
