import { SpecificationGroup } from "src/domain/models/specifications/specification-group";

export class SpecificationGroupVM {
  title: string;
  specificationType: string;
  items: any[];

  constructor(group: SpecificationGroup) {
    this.title = group.title;
    this.specificationType = group.specificationType;
    this.items = group.items;
  }
}