import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsNotEmpty, ValidateNested} from 'class-validator';
import {KitchenDto} from '../kitchen/kitchen.dto';
import {Carton} from '../../carton/entities/carton.entity';

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @ApiProperty()
    @ValidateNested()
    kitchen: KitchenDto;

    @ApiProperty()
    @ValidateNested()
    cartons: Carton[];

}
