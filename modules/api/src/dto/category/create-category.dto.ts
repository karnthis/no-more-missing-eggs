import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen/kitchen.dto';
import {Item} from '../../item/entities/item.entity';
import {ArrayMinSize, IsNotEmpty, ValidateNested} from 'class-validator';

export class CreateCategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    categoryName: string;

    @ApiProperty()
    @ValidateNested()
    kitchen: KitchenDto;

    @ApiProperty()
    @ArrayMinSize(1)
    items: Item[];

}
