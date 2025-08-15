import * as fs from 'fs';
import { IRepository } from 'src/application/ports/repository.interface';

export abstract class JsonRepository<T> implements IRepository<T> {
  protected readonly filePath: string;
  protected data: T[];

  constructor(jsonFilePath: string) {
    this.filePath = jsonFilePath;
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    this.data = JSON.parse(raw);
  }

  async findAll(): Promise<T[]> {
    return this.data;
  }

  async findBy(criteria: Partial<T>): Promise<T[]> {
    return this.data.filter((item) =>
      Object.entries(criteria).every(([key, value]) => item[key as keyof T] === value),
    );
  }

  async findOneBy(criteria: Partial<T>): Promise<T | null> {
    const found = this.data.find((item) =>
      Object.entries(criteria).every(([key, value]) => item[key as keyof T] === value),
    );
    return found || null;
  }

  async save(entity: T): Promise<T> {
    this.data.push(entity);
    this.persist();
    return entity;
  }

  async delete(criteria: Partial<T>): Promise<void> {
    this.data = this.data.filter(
      (item) =>
        !Object.entries(criteria).every(([key, value]) => item[key as keyof T] === value),
    );
    this.persist();
  }

  private persist(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
  }
}
