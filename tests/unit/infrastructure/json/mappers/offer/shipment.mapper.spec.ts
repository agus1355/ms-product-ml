import { Shipment } from 'src/domain/models/offer/shipment';
import { toDomainShipment, toPersistenceShipment } from 'src/infrastructure/json/mappers/offer/shipment.mapper';
import { Price } from 'src/domain/models/price';

describe('ShipmentMapper', () => {
    const rawShipment = {
        type: 'standard',
        deliveryTime: '2 days',
        cost: { currency: 'USD', amount: 5 },
        isFreeForBuyer: false,
    };

    describe('toDomainShipment', () => {
        it('should map a raw object to a Shipment domain model', () => {
            const shipment = toDomainShipment(rawShipment);
            expect(shipment).toBeInstanceOf(Shipment);
            expect(shipment.type).toBe(rawShipment.type);
            expect(shipment.cost).toBeInstanceOf(Price);
        });
    });

    describe('toPersistenceShipment', () => {
        it('should map a Shipment domain model to a raw object', () => {
            const shipment = new Shipment(
                'standard',
                '2 days',
                new Price('USD', 5),
                false
            );
            const raw = toPersistenceShipment(shipment);
            expect(raw.type).toBe(shipment.type);
            expect(raw.cost.amount).toBe(shipment.cost.amount);
        });
    });
});
