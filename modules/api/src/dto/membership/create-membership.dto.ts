import {MembershipDto} from './membership.dto';
import {ApiProperty} from '@nestjs/swagger';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {IsNumber, ValidateNested} from 'class-validator';

export class CreateMembershipDto {

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @ValidateNested()
    myKitchen: Kitchen;

    @ApiProperty()
    @ValidateNested()
    membership: MembershipDto;

}
