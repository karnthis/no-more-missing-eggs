import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateUserDto} from './create-user.dto';
import {IsEmail, IsOptional, Length} from 'class-validator';

export class UpdateUserDto {

  @ApiProperty()
  @Length(1, 50)
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @Length(1, 50)
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  emailAddress: string;

  @ApiProperty()
  @Length(1, 10)
  @IsOptional()
  status: string;

}
