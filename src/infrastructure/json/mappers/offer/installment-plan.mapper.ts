import { toDomainPrice } from '../price.mapper';
import { InstallmentPlan } from 'src/domain/models/offer/installment-plan';

export function toDomainInstallmentPlan(raw: any): InstallmentPlan {
  return new InstallmentPlan(
    raw.numberOfInstallments,
    toDomainPrice(raw.installmentAmount),
    raw.interestRate
  );
}

export function toPersistenceInstallmentPlan(installmentPlan: InstallmentPlan): any {
  return {
    numberOfInstallments: installmentPlan.numberOfInstallments,
    installmentAmount: installmentPlan.installmentAmount,
    interestRate: installmentPlan.interestRate
  };
}
