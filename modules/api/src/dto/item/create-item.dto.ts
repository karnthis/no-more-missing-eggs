import {ItemDto} from './item.dto';
import {ApiProperty} from '@nestjs/swagger';

export class CreateItemDto {

    @ApiProperty()
    usedCategories: number[];

    @ApiProperty()
    item: ItemDto;

}
