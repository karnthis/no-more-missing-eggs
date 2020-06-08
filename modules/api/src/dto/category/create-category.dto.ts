import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen/kitchen.dto';
import {Item} from '../../item/entities/item.entity';
import {ArrayMinSize, IsAlpha, IsNotEmpty, ValidateNested} from 'class-validator';

export class CreateCategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    categoryName: string;

    @ApiProperty()
    @ValidateNested()
    kitchen: KitchenDto;

    @ApiProperty()
    @ArrayMinSize(1)
    items: Item[];

}
