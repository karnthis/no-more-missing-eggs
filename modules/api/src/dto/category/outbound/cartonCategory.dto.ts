import {CategoryDto} from '../category.dto';
import {ApiProperty} from '@nestjs/swagger';
import {ValidateNested} from 'class-validator';
import {CartonDto} from '../../carton/carton.dto';

export class CartonCategoryDto extends CategoryDto {
    @ApiProperty()
    @ValidateNested()
    cartons: CartonDto[];
}
