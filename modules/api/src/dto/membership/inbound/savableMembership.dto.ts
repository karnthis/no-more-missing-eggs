import {MembershipDto} from '../membership.dto';
import {ApiProperty} from '@nestjs/swagger';
import {UserDto} from '../../user/user.dto';
import {KitchenDto} from '../../kitchen/kitchen.dto';
import {SavableUserDto} from '../../user/inbound/savableUser.dto';
import {SavableKitchenDto} from '../../kitchen/inbound/savableKitchen.dto';

export class SavableMembershipDto extends MembershipDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    user: SavableUserDto;

    @ApiProperty()
    kitchen: SavableKitchenDto;
}
