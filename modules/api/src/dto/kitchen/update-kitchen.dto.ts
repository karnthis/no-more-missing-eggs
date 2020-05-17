import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateKitchenDto {

  @ApiProperty()
  @IsNotEmpty()
  // @IsOptional()
  kitchenName: string;

}
