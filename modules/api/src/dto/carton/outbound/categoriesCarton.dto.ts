import {CartonDto} from '../carton.dto';
import {ApiProperty} from '@nestjs/swagger';
import {CompleteCategoryDto} from '../../category/outbound/completeCategory.dto';

export class CategoriesCartonDto extends CartonDto {

    @ApiProperty({type: [CompleteCategoryDto]})
    categories: CompleteCategoryDto[];

}
