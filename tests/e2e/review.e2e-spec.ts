import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestAppModule } from './test.app.module';

describe('ReviewController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new (require('src/infrastructure/rest/http-exception.filter').HttpExceptionFilter)());
    app.useGlobalPipes(new (require('@nestjs/common').ValidationPipe)({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/products/:id/reviews (GET)', () => {
    it('should return reviews for a valid product id', () => {
      const productId = 1;
      return request(app.getHttpServer())
        .get(`/products/${productId}/reviews`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('should return an empty array for a product with no reviews', () => {
        const productId = 5; // Product 5 has no reviews
        return request(app.getHttpServer())
          .get(`/products/${productId}/reviews`)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(0);
          });
    });
  });
});
