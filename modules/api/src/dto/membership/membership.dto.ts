import {ApiProperty} from '@nestjs/swagger';

export class MembershipDto {

    @ApiProperty()
    role: string;

}
