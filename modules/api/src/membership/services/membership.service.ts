
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {User} from '../../user/entities/user.entity';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';
import {UserService} from '../../user/services/user.service';
import {KitchenService} from '../../kitchen/services/kitchen.service';



@Injectable()
export class MembershipService {

  constructor(
      @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
      private readonly kitchenService: KitchenService,
      private readonly userService: UserService,
  ) {}

  async saveNew(createMembershipDto: CreateMembershipDto) {
    const {userId, kitchenId, membership} = createMembershipDto;
    const myUserDetails: User = await this.userService.findOneId(userId);
    const myKitchenDetails: Kitchen = await this.kitchenService.findOneDetails(kitchenId);

    const addedMembership = {...new Membership(), ...membership};
    addedMembership.user = myUserDetails;
    addedMembership.kitchen = myKitchenDetails;

    return await this.membershipRepository.save(addedMembership);
  }
}
