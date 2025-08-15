import { SpecificationItemBase } from './specification-item-base';

export class RowItem extends SpecificationItemBase {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly value: string,
  ) {
    super();
  }
}
