import {CategoryDto} from '../category.dto';
import {ApiProperty} from '@nestjs/swagger';
import {ItemsCartonDto} from '../../carton/outbound/itemsCarton.dto';

export class CompleteCategoryDto extends CategoryDto {

    @ApiProperty({type: [ItemsCartonDto]})
    cartons: ItemsCartonDto[];

}
