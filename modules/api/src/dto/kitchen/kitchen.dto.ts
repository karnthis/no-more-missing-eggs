import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsNotEmpty, IsNumber} from 'class-validator';

export class KitchenDto {

    @ApiProperty()
    @IsNumber()
    ownerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    kitchenName: string;

}
