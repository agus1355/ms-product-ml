import { Shipment } from 'src/domain/models/shipment';
import { toDomainPrice, toPersistencePrice } from './price.mapper';

export function toDomainShipment(raw: any): Shipment {
  return new Shipment(raw.type, raw.deliveryTime, toDomainPrice(raw.cost), raw.isFreeForBuyer);
}

export function toPersistenceShipment(shipment: Shipment): any {
  return {
    type: shipment.type,
    deliveryTime: shipment.deliveryTime,
    cost: toPersistencePrice(shipment.cost),
    isFreeForBuyer: shipment.isFreeForBuyer,
  };
}
