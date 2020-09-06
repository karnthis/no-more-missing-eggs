import {ApiProperty} from '@nestjs/swagger';
import {KitchenDto} from '../kitchen.dto';
import {MembershipDto} from '../../membership/membership.dto';
import {IsNumber, ValidateNested} from 'class-validator';

export class CreateKitchenDto {

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @ValidateNested()
    membership: MembershipDto;

    @ApiProperty()
    @ValidateNested()
    savableKitchen: KitchenDto;

}
