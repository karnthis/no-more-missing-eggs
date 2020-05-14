import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from './kitchen.dto';
import {MembershipDto} from '../membership/membership.dto';

export class CreateKitchenDto {

    @ApiProperty()
    userId: number;

    @ApiProperty()
    membership: MembershipDto;

    @ApiProperty()
    savableKitchen: KitchenDto;

}
