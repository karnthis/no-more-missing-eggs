import {ApiProperty} from '@nestjs/swagger';
import {IsBase64, IsNumber, IsString, Length} from 'class-validator';

export class LoginResponseDto {

    @ApiProperty()
    @IsBase64()
    // tslint:disable-next-line:variable-name
    access_token: string;

    @ApiProperty()
    userInfo: object;

    @ApiProperty()
    kitchenIds: number[];

}
