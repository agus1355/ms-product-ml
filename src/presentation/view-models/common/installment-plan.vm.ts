import { InstallmentPlan } from 'src/domain/models/offer/installment-plan';
import { PriceVM } from './price.vm';

export class InstallmentPlanVM {
  readonly installmentsCount: number;
  readonly installmentAmount: PriceVM;

  constructor(installmentPlan: InstallmentPlan) {
    this.installmentsCount = installmentPlan.numberOfInstallments;
    this.installmentAmount = new PriceVM(installmentPlan.installmentAmount);
  }
}