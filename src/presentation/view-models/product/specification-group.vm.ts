import { ApiProperty } from "@nestjs/swagger";
import { SpecificationGroup } from "src/domain/models/specifications/specification-group";

export class SpecificationGroupVM {
  @ApiProperty({ example: 'General', description: 'The title of the specification group' })
  title: string;

  @ApiProperty({ example: 'text', description: 'The type of specification' })
  specificationType: string;

  @ApiProperty({ isArray: true, description: 'The items in the specification group' })
  items: any[];

  constructor(group: SpecificationGroup) {
    this.title = group.title;
    this.specificationType = group.specificationType;
    this.items = group.items;
  }
}