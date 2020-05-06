import {MembershipDto} from './membership.dto';
import {ApiProperty} from '@nestjs/swagger';

export class CreateMembershipDto {

    @ApiProperty()
    userId: number;

    @ApiProperty()
    kitchenId: number;

    @ApiProperty()
    membership: MembershipDto;

}
