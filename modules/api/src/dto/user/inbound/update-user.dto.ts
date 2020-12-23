import {ApiProperty, ApiPropertyOptional, PartialType} from '@nestjs/swagger';
import {CreateUserDto} from './create-user.dto';
import {IsEmail, IsOptional, Length} from 'class-validator';

export class UpdateUserDto {

  @ApiPropertyOptional()
  @Length(1, 50)
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional()
  @Length(1, 50)
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @Length(1, 10)
  @IsOptional()
  status: string;

}
