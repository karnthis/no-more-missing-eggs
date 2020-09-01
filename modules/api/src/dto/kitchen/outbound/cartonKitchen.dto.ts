import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen.dto';
import {ExpandedMembershipDto} from '../../membership/outbound/expandedMembership.dto';

export class CartonKitchenDto extends KitchenDto {
    @ApiProperty()
    memberships: ExpandedMembershipDto[];

}
