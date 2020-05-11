import {MembershipDto} from './membership.dto';
import {ApiProperty} from '@nestjs/swagger';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';

export class CreateMembershipDto {

    @ApiProperty()
    userId: number;

    @ApiProperty()
    myKitchen: Kitchen;

    @ApiProperty()
    membership: MembershipDto;

}
