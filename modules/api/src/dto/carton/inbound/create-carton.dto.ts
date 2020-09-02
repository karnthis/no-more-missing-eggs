import {CartonDto} from '../carton.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, ValidateNested} from 'class-validator';

export class CreateCartonDto {

    @ApiProperty()
    @IsNumber()
    kitchenId: number;

    @ApiProperty()
    // @IsNumber()
    usedCategories: number[];

    @ApiProperty()
    @ValidateNested()
    carton: CartonDto;

}
