import {CartonDto} from '../carton.dto';
import {ApiProperty} from '@nestjs/swagger';
import {ItemDto} from '../../item/item.dto';

export class ItemsCartonDto extends CartonDto {

    @ApiProperty({type: [ItemDto]})
    items: ItemDto[];

}
