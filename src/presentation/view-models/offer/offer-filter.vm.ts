import { IsOptional, IsArray, IsEnum, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { OfferType } from 'src/domain/enums/offer-type';
import { ApiProperty } from '@nestjs/swagger';

export class OfferFilterVM {

    @ApiProperty({
        description: 'A comma-separated list of offer types to filter by',
        required: false,
        type: String,
        example: 'BEST_PRICE,BEST_INSTALLMENT,BEST_SHIPMENT'
    })
    @IsOptional()
    @IsArray()
    @Transform(({ value }) => {
        if (typeof value === 'string') {
        return value.split(',').map((v) => v.trim());
        }
        return value;
    })
    offerTypes?: OfferType[];

    @IsOptional()
    limit?: number = 5;
}
