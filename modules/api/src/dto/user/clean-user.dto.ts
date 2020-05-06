import {ApiProperty} from '@nestjs/swagger';

export class CleanUserDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    emailAddress: string;

    @ApiProperty()
    status: string;

}
