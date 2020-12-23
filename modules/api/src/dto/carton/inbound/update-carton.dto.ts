import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class UpdateCartonDto {

  @ApiProperty()
  @IsNotEmpty()
  // @IsOptional()
  name: string;

}
