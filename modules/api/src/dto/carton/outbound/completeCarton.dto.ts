import {CartonDto} from '../carton.dto';
import {ItemDto} from '../../item/item.dto';
import {ApiProperty} from '@nestjs/swagger';
import {CompleteCategoryDto} from '../../category/outbound/completeCategory.dto';

export class CompleteCartonDto extends CartonDto {

    @ApiProperty()
    categories: CompleteCategoryDto[];

    @ApiProperty()
    items: ItemDto[];

}
