import {ItemDto} from './item.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, ValidateNested} from 'class-validator';

export class CreateItemDto {

    @ApiProperty()
    @IsNumber()
    cartonId: number;

    @ApiProperty()
    @ValidateNested()
    item: ItemDto;

}
