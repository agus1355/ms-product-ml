import { SpecificationType } from "src/domain/enums/specification-type";
import { SpecificationItemBase } from "./specification-item-base";

export class SpecificationGroup {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly specificationType: SpecificationType,
    public readonly items: SpecificationItemBase[],
  ) {}
}