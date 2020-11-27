import {KitchenDto} from '../kitchen.dto';
import {ApiProperty} from '@nestjs/swagger';
import {MembershipDto} from '../../membership/membership.dto';
import {CategoryDto} from '../../category/category.dto';
import {CartonDto} from '../../carton/carton.dto';
import {SavableMembershipDto} from '../../membership/inbound/savableMembership.dto';
import {SavableCartonDto} from '../../carton/inbound/savableCarton.dto';
import {SavableCategoryDto} from '../../category/inbound/savableCategory.dto';

export class SavableKitchenDto extends KitchenDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsDate()
    lastUpdated: Date;

    @ApiProperty()
    memberships: SavableMembershipDto[];

    @ApiProperty()
    categories: SavableCategoryDto[];

    @ApiProperty()
    cartons: SavableCartonDto[];

}
