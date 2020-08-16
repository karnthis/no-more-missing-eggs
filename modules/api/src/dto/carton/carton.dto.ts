import {ApiProperty} from '@nestjs/swagger';
import {Category} from '../../category/entities/category.entity';
import {Column} from 'typeorm';
import {IsBoolean, IsNotEmpty, IsNumber} from 'class-validator';

export class CartonDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

}
