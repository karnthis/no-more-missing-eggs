import {ApiProperty} from '@nestjs/swagger';
import {ItemDto} from '../item/item.dto';
import {CreateKitchenDto} from '../kitchen/create-kitchen.dto';

export class CategoryDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    kitchen: CreateKitchenDto;

    @ApiProperty()
    items: ItemDto;

}
