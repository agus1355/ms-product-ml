import { Category } from "../category";

export class ProductCategory {
  constructor(
    public readonly id: number,
    public readonly category: Category,
    public readonly ranking: number,
  ) {}
}
