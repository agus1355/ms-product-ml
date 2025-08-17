export class Discount {
  constructor(
    public readonly discountValue: number,
    public readonly dateFrom: Date,
    public readonly dateTo: Date,
    public readonly creationDate: Date,
    public readonly enabled: boolean,
    public readonly updatedAt: Date,
  ) {}
}