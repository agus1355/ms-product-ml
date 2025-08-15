import { Category } from "src/domain/models/category";

export class CategoryVM {
  name: string;
  parent?: number;

  constructor(category: Category) {
    this.name = category.name;
    this.parent = category.parentId ? category.parentId : undefined;
  }
}