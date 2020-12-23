import {ApiProperty} from '@nestjs/swagger';
import {UserDto} from '../../user/user.dto';
import {MembershipDto} from '../membership.dto';

export class ExpandedMembershipDto extends MembershipDto {

    @ApiProperty({type: [UserDto]})
    user: UserDto;

}
