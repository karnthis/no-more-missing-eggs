import {CategoryDto} from '../category.dto';
import {ApiProperty} from '@nestjs/swagger';
import {SavableKitchenDto} from '../../kitchen/inbound/savableKitchen.dto';
import {SavableCartonDto} from '../../carton/inbound/savableCarton.dto';

export class SavableCategoryDto extends CategoryDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    kitchen: SavableKitchenDto;

    @ApiProperty()
    cartons: SavableCartonDto[];

}
