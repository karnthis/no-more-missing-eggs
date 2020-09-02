import {ApiProperty} from '@nestjs/swagger';
import {ItemDto} from '../../item/item.dto';
import {CategoryDto} from '../../category/category.dto';
import {CartonDto} from '../carton.dto';
import {SavableKitchenDto} from '../../kitchen/inbound/savableKitchen.dto';
import {SavableItemDto} from '../../item/inbound/savableItem.dto';
import {SavableCategoryDto} from '../../category/inbound/savableCategory.dto';

export class SavableCartonDto extends CartonDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    kitchen: SavableKitchenDto;

    @ApiProperty()
    items: SavableItemDto[];

    @ApiProperty()
    categories: SavableCategoryDto[];
}
