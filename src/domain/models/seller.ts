export class Seller {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly score: number,
    public readonly isVerified: boolean,
  ) {}
}
