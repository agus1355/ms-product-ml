export class Warranty {
  constructor(
    public readonly id: number,
    public readonly duration: number,
    public readonly unit: 'days' | 'months' | 'years',
  ) {}
}