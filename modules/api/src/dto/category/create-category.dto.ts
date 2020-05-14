import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen/kitchen.dto';
import {Item} from '../../item/entities/item.entity';

export class CreateCategoryDto {

    @ApiProperty()
    categoryName: string;

    @ApiProperty()
    kitchen: KitchenDto;

    @ApiProperty()
    items: Item[];

}
