
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import {User} from '../../user/entities/user.entity';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';
import {UserService} from '../../user/services/user.service';

@Injectable()
export class MembershipService {

  constructor(
      @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
      private readonly userService: UserService,
  ) {}

  async saveNew(createMembershipDto: CreateMembershipDto) {
    const {userId, myKitchen, membership} = createMembershipDto;
    const myUserDetails: User = await this.userService.findOneById(userId);

    const addedMembership = {...new Membership(), ...membership};
    addedMembership.user = myUserDetails;
    addedMembership.kitchen = myKitchen;

    return await this.membershipRepository.save(addedMembership);
  }
}
