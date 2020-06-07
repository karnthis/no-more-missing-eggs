import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNumber, isNumber, Length} from 'class-validator';

export class CleanUserDto {
  @ApiProperty()
  @Length(1, 50)
  firstName: string;

  @ApiProperty()
  @Length(1, 50)
  lastName: string;

  @ApiProperty()
  @Length(1, 50)
  username: string;

  @ApiProperty()
  @IsEmail()
  emailAddress: string;

  @ApiProperty()
  @Length(1, 10)
  status: string;

  @ApiProperty()
  @IsNumber()
  id: number;

}
