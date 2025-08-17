import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestAppModule } from './test.app.module';
import { OfferType } from 'src/domain/enums/offer-type';

describe('OfferController (e2e)', () => {
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

  describe('/products/:id/offers (GET)', () => {
    it('should return offers for a valid product id', () => {
      const productId = 1;
      return request(app.getHttpServer())
        .get(`/products/${productId}/offers`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('should filter offers by type', () => {
        const productId = 1;
        const offerType = OfferType.BEST_PRICE;
        return request(app.getHttpServer())
          .get(`/products/${productId}/offers?offerTypes=${offerType}`)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeInstanceOf(Array);
            res.body.forEach(offer => {
                expect(offer.offerType).toBe(offerType);
            });
          });
    });

    it('should accept a limit query param', () => {
        const productId = 1;
        const limit = 1;
        return request(app.getHttpServer())
            .get(`/products/${productId}/offers?limit=${limit}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body.length).toBeLessThanOrEqual(limit);
            });
    });
  });
});
