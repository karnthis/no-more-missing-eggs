import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class UpdateItemDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  count: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  expiration: number;

}
