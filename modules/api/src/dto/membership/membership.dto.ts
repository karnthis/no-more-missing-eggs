import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsNotEmpty} from 'class-validator';

export class MembershipDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    role: string;

}
