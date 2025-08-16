import { IRepository } from "./repository.interface";
import { Category } from "src/domain/models/category";


export interface ICategoryRepository extends IRepository<Category> {}
