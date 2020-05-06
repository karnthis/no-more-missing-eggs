
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {User} from '../../user/entities/user.entity';
import {MembershipDto} from '../../dto/membership/membership.dto';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';

@Injectable()
export class MembershipService {

  constructor(
      @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
      @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>,
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async saveNew(createMembershipDto: CreateMembershipDto) {
    const {userId, kitchenId, membership} = createMembershipDto;
    const myUserDetails: User = await this.userRepository.findOne(userId);
    const myKitchenDetails: Kitchen = await this.kitchenRepository.findOne(kitchenId);

    const addedMembership = {...new Membership(), ...membership};
    addedMembership.user = myUserDetails;
    addedMembership.kitchen = myKitchenDetails;

    const myMembership: Membership = await this.membershipRepository.save(addedMembership);
    return myMembership;
  }
}
