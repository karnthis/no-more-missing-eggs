import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen.dto';
import {ExpandedMembershipDto} from '../../membership/outbound/expandedMembership.dto';

export class ExpandedKitchenDto extends KitchenDto {
    @ApiProperty({type: [ExpandedMembershipDto]})
    memberships: ExpandedMembershipDto[];

}
