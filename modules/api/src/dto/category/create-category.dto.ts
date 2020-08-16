import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen/kitchen.dto';
import {ArrayMinSize, IsAlpha, IsNotEmpty, ValidateNested} from 'class-validator';
import {Carton} from '../../carton/entities/carton.entity';

export class CreateCategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @ApiProperty()
    @ValidateNested()
    kitchen: KitchenDto;

    @ApiProperty()
    @ArrayMinSize(0)
    cartons: Carton[];

}
