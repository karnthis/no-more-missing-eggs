import {ApiProperty} from '@nestjs/swagger';

export class LoginResponseDto {

    @ApiProperty()
      // tslint:disable-next-line:variable-name
    access_token: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    id: number;

}
