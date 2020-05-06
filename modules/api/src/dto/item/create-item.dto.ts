import {ItemDto} from './item.dto';
import {ApiProperty} from '@nestjs/swagger';

export class CreateItemDto {

    @ApiProperty()
    kitchenId: number;

    @ApiProperty()
    item: ItemDto;

}
