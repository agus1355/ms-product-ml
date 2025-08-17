import { ApiProperty } from '@nestjs/swagger';
import { InstallmentPlan } from 'src/domain/models/offer/installment-plan';
import { PriceVM } from './price.vm';

export class InstallmentPlanVM {
  @ApiProperty({ example: 12, description: 'The number of installments' })
  readonly installmentsCount: number;

  @ApiProperty({ type: () => PriceVM, description: 'The amount of each installment' })
  readonly installmentAmount: PriceVM;

  constructor(installmentPlan: InstallmentPlan) {
    this.installmentsCount = installmentPlan.numberOfInstallments;
    this.installmentAmount = new PriceVM(installmentPlan.installmentAmount);
  }
}