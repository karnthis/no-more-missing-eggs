import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class MembershipDto {

    @ApiProperty()
    @IsNotEmpty()
    role: string;

}
