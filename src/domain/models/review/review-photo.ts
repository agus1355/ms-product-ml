export class ReviewPhoto {
  constructor(
    public readonly id: number,
    public readonly url: string,
    public readonly description?: string,
    public readonly order?: number,
    public readonly type?: string,
  ) {}
}
