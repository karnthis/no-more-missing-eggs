import {ApiProperty} from '@nestjs/swagger';
import {Category} from '../../category/entities/category.entity';
import {Column} from 'typeorm';
import {IsBoolean, IsNotEmpty, IsNumber} from 'class-validator';

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
    @IsNumber()
    expiration: number;

    @ApiProperty()
    @IsNumber()
    added: number;

}
