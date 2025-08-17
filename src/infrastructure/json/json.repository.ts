import * as fs from 'fs';
import { IRepository } from 'src/application/ports/repository.interface';

export abstract class JsonRepository<T> implements IRepository<T> {
  protected readonly filePath: string;
  protected data: any[];
  protected readonly mapToDomain: (raw: any) => T;
  protected readonly mapToPersistence?: (entity: T) => any;

  constructor(jsonFilePath: string, mapToDomain: (raw: any) => T, mapToPersistence?: (entity: T) => any) {
    this.filePath = jsonFilePath;
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    this.data = JSON.parse(raw);
    this.mapToDomain = mapToDomain;
    this.mapToPersistence = mapToPersistence;
  }

  async findAll(): Promise<T[]> {
    return this.data.map((r) => this.mapToDomain(r));
  }

  async findBy(criteria: Partial<T>): Promise<T[]> {
    const raws = this.data.filter((item) =>
      Object.entries(criteria).every(([key, value]) => item[key as keyof typeof item] === value),
    );
    return raws.map((r) => this.mapToDomain(r));
  }

  async findOneBy(criteria: Partial<T>): Promise<T | null> {
    const raw = this.data.find((item) =>
      Object.entries(criteria).every(([key, value]) => item[key as keyof typeof item] === value),
    );
    return raw ? this.mapToDomain(raw) : null;
  }

  async save(entity: T): Promise<T> {
    const persisted = this.mapToPersistence ? this.mapToPersistence(entity) : (entity as any);
    this.data.push(persisted);
    this.persist();
    return entity;
  }

  async delete(criteria: Partial<T>): Promise<void> {
    this.data = this.data.filter(
      (item) => !Object.entries(criteria).every(([key, value]) => item[key as keyof typeof item] === value),
    );
    this.persist();
  }

  private persist(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
  }
}
