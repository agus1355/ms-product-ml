import { SpecificationItemBase } from './specification-item-base';

export class IconItem extends SpecificationItemBase {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly value: string,
    public readonly icon: string,
  ) {
    super();
  }
}
