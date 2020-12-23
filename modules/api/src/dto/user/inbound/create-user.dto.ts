import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, Length} from 'class-validator';

export class CreateUserDto {

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
    @Length(1, 100)
    password: string;

    @ApiProperty()
    @Length(1, 100)
    confirmPassword: string;

    @ApiProperty()
    @IsEmail()
    email: string;

}
