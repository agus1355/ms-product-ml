import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestAppModule } from './test.app.module';

describe('ProductController (e2e)', () => {
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

  describe('/products/:id (GET)', () => {
    it('should return a product for a valid id', () => {
      const productId = 1;
      return request(app.getHttpServer())
        .get(`/products/${productId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toBe(productId);
        });
    });

    it('should return 400 for an invalid id', () => {
        return request(app.getHttpServer())
          .get('/products/invalid-id')
          .expect(400);
    });

    it('should return 404 for a non-existing product', () => {
        const productId = 9999;
        return request(app.getHttpServer())
          .get(`/products/${productId}`)
          .expect(404);
    });
  });

  describe('/products/:id/related (GET)', () => {
    it('should return 200 or 404, and an array if 200', () => {
        const productId = 1;
        return request(app.getHttpServer())
          .get(`/products/${productId}/related`)
          .expect((res) => {
            expect(res.status).toBeOneOf([200, 404]);
            if (res.status === 200) {
              expect(res.body).toBeInstanceOf(Array);
            }
          });
    });

    it('should accept a limit query param', () => {
        const productId = 1;
        const limit = 1;
        return request(app.getHttpServer())
          .get(`/products/${productId}/related?limit=${limit}`)
          .expect((res) => {
            expect(res.status).toBeOneOf([200, 404]);
            if (res.status === 200) {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body.length).toBeLessThanOrEqual(limit);
            }
          });
    });
  });
});

// Helper to extend jest's expect
expect.extend({
    toBeOneOf(received, items) {
      const pass = items.includes(received);
      if (pass) {
        return {
          message: () => `expected ${received} not to be one of [${items.join(', ')}]`,
          pass: true,
        };
      } else {
        return {
          message: () => `expected ${received} to be one of [${items.join(', ')}]`,
          pass: false,
        };
      }
    },
  });
