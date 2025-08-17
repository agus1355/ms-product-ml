import { ProductPhoto } from 'src/domain/models/product/product-photo';
import { toDomainProductPhoto, toPersistenceProductPhoto } from 'src/infrastructure/json/mappers/product/product-photo.mapper';

describe('ProductPhotoMapper', () => {
    const rawProductPhoto = {
        id: 1,
        url: 'http://example.com/photo.jpg',
        description: 'Test Photo',
        order: 1,
        type: 'image',
    };

    describe('toDomainProductPhoto', () => {
        it('should map a raw object to a ProductPhoto domain model', () => {
            const productPhoto = toDomainProductPhoto(rawProductPhoto);
            expect(productPhoto).toBeInstanceOf(ProductPhoto);
            expect(productPhoto.id).toBe(rawProductPhoto.id);
            expect(productPhoto.url).toBe(rawProductPhoto.url);
        });
    });

    describe('toPersistenceProductPhoto', () => {
        it('should map a ProductPhoto domain model to a raw object', () => {
            const productPhoto = new ProductPhoto(
                1,
                'http://example.com/photo.jpg',
                'Test Photo',
                1,
                'image'
            );
            const raw = toPersistenceProductPhoto(productPhoto);
            expect(raw).toEqual(rawProductPhoto);
        });
    });
});
