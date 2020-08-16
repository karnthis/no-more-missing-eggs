import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class KitchenDto {

    @ApiProperty()
    @IsNumber()
    ownerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    kitchenName: string;

}
