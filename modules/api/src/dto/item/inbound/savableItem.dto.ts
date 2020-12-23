import {ItemDto} from '../item.dto';
import {ApiProperty} from '@nestjs/swagger';
import {SavableCartonDto} from '../../carton/inbound/savableCarton.dto';

export class SavableItemDto extends ItemDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    carton: SavableCartonDto;

}
