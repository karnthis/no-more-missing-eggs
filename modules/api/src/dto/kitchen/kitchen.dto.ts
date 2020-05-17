import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';

export class KitchenDto {

    @ApiProperty()
    @IsNumber()
    ownerId: number;

    @ApiProperty()
    @IsNotEmpty()
    kitchenName: string;

}
