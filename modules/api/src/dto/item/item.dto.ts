import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Category} from '../../category/entities/category.entity';
import {Column} from 'typeorm';
import {IsAlpha, IsBoolean, IsDate, IsJSON, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class ItemDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    barcode: number;

    @ApiProperty()
    @IsNumber()
    count: number;

    @ApiProperty()
    @IsDate()
    expiration: Date;

    @ApiProperty()
    @IsDate()
    added: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    metadata: {};

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    lastUpdated: Date;

}
