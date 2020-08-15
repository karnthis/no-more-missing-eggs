import {ApiProperty} from '@nestjs/swagger';
import {Column} from 'typeorm';
import {IsBoolean, IsNotEmpty, IsNumber, IsOptional} from 'class-validator';

export class UpdateCartonDto {

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

  @Column()
  @IsBoolean()
  @IsOptional()
  isDelete: boolean;

}
