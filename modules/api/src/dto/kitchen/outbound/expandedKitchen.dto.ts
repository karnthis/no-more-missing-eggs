import {ApiProperty} from '@nestjs/swagger';
import {IsNumber} from 'class-validator';
import {KitchenDto} from '../kitchen.dto';
import {MembershipDto} from '../../membership/membership.dto';

export class ExpandedKitchenDto extends KitchenDto {
    @ApiProperty()
    memberships: MembershipDto[];

}
