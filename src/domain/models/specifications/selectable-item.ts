import { SpecificationItemBase } from "./specification-item-base";

export class SelectableItem extends SpecificationItemBase {
  constructor(
    public readonly id: number,
    public readonly value: string,
    public readonly selectableValue: string,
    public readonly icon?: string,
  ) {
    super();
  }
}
