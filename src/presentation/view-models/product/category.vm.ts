import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/domain/models/category";

export class CategoryVM {
  @ApiProperty({ example: 'Electronics', description: 'The name of the category' })
  name: string;

  @ApiProperty({ example: 1, description: 'The ID of the parent category', required: false })
  parent?: number;

  constructor(category: Category) {
    this.name = category.name;
    this.parent = category.parentId ? category.parentId : undefined;
  }
}