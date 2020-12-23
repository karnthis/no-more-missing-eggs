import {UserDto} from '../user.dto';
import {ApiProperty} from '@nestjs/swagger';
import {SavableKitchenDto} from '../../kitchen/inbound/savableKitchen.dto';
import {SavableMembershipDto} from '../../membership/inbound/savableMembership.dto';

export class SavableUserDto extends UserDto {
    @ApiProperty()
    password: string;

    @ApiProperty()
    lastUpdated: Date;

    @ApiProperty()
    memberships: SavableMembershipDto[];

}
