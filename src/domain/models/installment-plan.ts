import { Price } from "./price";

export class InstallmentPlan {
  constructor(
    public readonly numberOfInstallments: number,
    public readonly installmentAmount: Price,
    public readonly interestRate: number
  ) {}
}