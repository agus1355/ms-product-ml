import { InstallmentPlan } from 'src/domain/models/offer/installment-plan';
import { toDomainInstallmentPlan, toPersistenceInstallmentPlan } from 'src/infrastructure/json/mappers/offer/installment-plan.mapper';
import { Price } from 'src/domain/models/price';

describe('InstallmentPlanMapper', () => {
  const rawInstallmentPlan = {
    numberOfInstallments: 12,
    installmentAmount: { currency: 'USD', amount: 10 },
    interestRate: 0.1,
  };

  describe('toDomainInstallmentPlan', () => {
    it('should map a raw object to a InstallmentPlan domain model', () => {
      const installmentPlan = toDomainInstallmentPlan(rawInstallmentPlan);
      expect(installmentPlan).toBeInstanceOf(InstallmentPlan);
      expect(installmentPlan.numberOfInstallments).toBe(rawInstallmentPlan.numberOfInstallments);
      expect(installmentPlan.installmentAmount).toBeInstanceOf(Price);
    });
  });

  describe('toPersistenceInstallmentPlan', () => {
    it('should map a InstallmentPlan domain model to a raw object', () => {
      const installmentPlan = new InstallmentPlan(
        12,
        new Price('USD', 10),
        0.1
      );
      const raw = toPersistenceInstallmentPlan(installmentPlan);
      expect(raw.numberOfInstallments).toBe(installmentPlan.numberOfInstallments);
    });
  });
});
