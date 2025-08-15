import { SpecificationItemBase } from './specification-item-base';

export class ValueItem extends SpecificationItemBase {
  constructor(
    public readonly id: number,
    public readonly value: string,
  ) {
    super();
  }
}
