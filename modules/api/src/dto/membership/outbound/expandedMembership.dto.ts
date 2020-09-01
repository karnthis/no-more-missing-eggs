import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsOptional} from 'class-validator';
import {UserDto} from '../../user/user.dto';
import {MembershipDto} from '../membership.dto';

export class ExpandedMembershipDto extends MembershipDto {

    @ApiProperty()
    user: UserDto;

}
