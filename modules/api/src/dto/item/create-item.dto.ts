import {ItemDto} from './item.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, ValidateNested} from 'class-validator';

export class CreateItemDto {

    @ApiProperty()
    @IsNumber()
    usedCategories: number[];

    @ApiProperty()
    @ValidateNested()
    item: ItemDto;

}
