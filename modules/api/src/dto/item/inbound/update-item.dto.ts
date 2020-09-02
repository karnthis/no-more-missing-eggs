import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class UpdateItemDto {

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  count: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  expiration: number;

}
