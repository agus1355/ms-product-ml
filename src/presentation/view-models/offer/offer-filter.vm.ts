import { IsOptional, IsArray, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { OfferType } from 'src/domain/enums/offer-type';

export class OfferFilterVM {
    @IsOptional()
    @IsArray()
    @IsEnum(OfferType, { each: true })
    @Transform(({ value }) => value.split(','))
    offerTypes?: OfferType[];

    @IsOptional()
    @IsPositive()
    @Transform(({ value }) => parseInt(value, 10))
    limit?: number = 5;
}
