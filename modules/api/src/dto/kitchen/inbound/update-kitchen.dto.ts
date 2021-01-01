import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateKitchenDto {

  @ApiProperty()
  @IsNotEmpty()
  // @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  metadata?: {};

}
