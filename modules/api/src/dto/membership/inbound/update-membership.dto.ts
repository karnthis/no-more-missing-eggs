import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateMembershipDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsAlpha()
  // @IsOptional()
  role: string;

}
