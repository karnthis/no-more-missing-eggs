import {MembershipDto} from './membership.dto';

export class CreateMembershipDto {
    userId: number;
    kitchenId: number;
    membership: MembershipDto;
}
