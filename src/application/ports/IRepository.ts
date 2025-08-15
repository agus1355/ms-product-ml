export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findBy(criteria: Partial<T>): Promise<T[]>;
  findOneBy(criteria: Partial<T>): Promise<T | null>;
  save(entity: T): Promise<T>;
  delete(criteria: Partial<T>): Promise<void>;
}