import { IsOptional, IsArray, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { OfferType } from 'src/domain/enums/offer-type';
import { ApiProperty } from '@nestjs/swagger';

export class OfferFilterVM {
    @ApiProperty({
        description: 'A comma-separated list of offer types to filter by',
        required: false,
        type: String,
        example: 'Flash,Hot'
    })
    @IsOptional()
    @IsArray()
    @IsEnum(OfferType, { each: true })
    @Transform(({ value }) => value.split(','))
    offerTypes?: OfferType[];

    @ApiProperty({
        description: 'The maximum number of offers to return',
        required: false,
        type: Number,
        example: 10
    })
    @IsOptional()
    @IsPositive()
    limit?: number = 5;
}
