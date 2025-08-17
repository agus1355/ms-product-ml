import { ApiProperty } from '@nestjs/swagger';
import { Discount } from 'src/domain/models/offer/discount';

export class DiscountVM {
  @ApiProperty({ example: 10, description: 'The value of the discount' })
  readonly discountValue: number;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', description: 'The start date of the discount' })
  readonly dateFrom: Date;

  @ApiProperty({ example: '2025-12-31T23:59:59.000Z', description: 'The end date of the discount' })
  readonly dateTo: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z', description: 'The creation date of the discount' })
  readonly creationDate: Date;

  @ApiProperty({ example: true, description: 'Indicates if the discount is currently enabled' })
  readonly enabled: boolean;

  @ApiProperty({ example: '2025-06-01T12:00:00.000Z', description: 'The last update date of the discount' })
  readonly updatedAt: Date;

  constructor(discount: Discount) {
    this.discountValue = discount.discountValue;
    this.dateFrom = discount.dateFrom;
    this.dateTo = discount.dateTo;
    this.creationDate = discount.creationDate;
    this.enabled = discount.enabled;
    this.updatedAt = discount.updatedAt;
  }
}
