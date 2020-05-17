import {ApiProperty} from '@nestjs/swagger';
import {ItemDto} from '../item/item.dto';
import {CreateKitchenDto} from '../kitchen/create-kitchen.dto';
import {IsNotEmpty, ValidateNested} from 'class-validator';

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @ValidateNested()
    kitchen: CreateKitchenDto;

    @ApiProperty()
    @ValidateNested()
    items: ItemDto;

}
