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
    limit?: number = 5;
}
