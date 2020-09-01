import {CategoryDto} from '../category.dto';
import {ApiProperty} from '@nestjs/swagger';
import {ValidateNested} from 'class-validator';
import {CartonDto} from '../../carton/carton.dto';
import {ItemDto} from '../../item/item.dto';
import {ItemsCartonDto} from '../../carton/outbound/itemsCarton.dto';

export class CompleteCategoryDto extends CategoryDto {

    @ApiProperty()
    // @ValidateNested()
    cartons: ItemsCartonDto[];

}
