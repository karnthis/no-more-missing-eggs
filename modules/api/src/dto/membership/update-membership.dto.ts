import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateMembershipDto {

  @ApiProperty()
  @IsNotEmpty()
  // @IsOptional()
  role: string;

}
