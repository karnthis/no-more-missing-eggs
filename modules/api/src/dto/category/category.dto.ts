import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsOptional, ValidateNested} from 'class-validator';
import {KitchenDto} from '../kitchen/kitchen.dto';
import {Carton} from '../../carton/entities/carton.entity';

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

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
