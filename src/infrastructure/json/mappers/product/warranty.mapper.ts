import { Warranty } from 'src/domain/models/product/warranty';

export function toDomainWarranty(raw: any): Warranty {
  return new Warranty(raw.id, raw.duration, raw.unit);
}

export function toPersistenceWarranty(w: Warranty): any {
  return { id: w.id, duration: w.duration, unit: w.unit };
}
