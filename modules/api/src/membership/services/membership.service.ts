
import {HttpException, Injectable} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import {User} from '../../user/entities/user.entity';
import {CreateMembershipDto} from '../../dto/membership/inbound/create-membership.dto';
import {UserService} from '../../user/services/user.service';
import {UpdateMembershipDto} from '../../dto/membership/inbound/update-membership.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {MembershipDto} from '../../dto/membership/membership.dto';

@Injectable()
export class MembershipService {

  constructor(
      @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
      private readonly userService: UserService,
  ) {}

  // Used on Kitchen creation and to add new relations
  async saveNew(createMembershipDto: CreateMembershipDto): Promise<MembershipDto> {
    try {
      const {userId, myKitchen, membership} = createMembershipDto;
      const myUserDetails: User = await this.userService.findOneById(userId);

      const firstMembership = {...new Membership(), ...membership, ...{status: 'active', lastUpdated: new Date()}};
      firstMembership.user = myUserDetails;
      firstMembership.kitchen = myKitchen;

      return await this.membershipRepository.save(firstMembership);
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }
  }

  async getOne(id: number): Promise<MembershipDto|undefined> {
    return await this.membershipRepository.findOne(id);
  }

  async update(id: number, updateMembership: UpdateMembershipDto): Promise<MembershipDto> {
    await this.membershipRepository.update(id, {...updateMembership, ...{lastUpdated: new Date()}});
    return this.membershipRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<MembershipDto> {
    const toInactivate = await this.membershipRepository.findOne(id);
    toInactivate.status = 'inactive';
    toInactivate.lastUpdated = new Date();
    await this.membershipRepository.update(id, toInactivate);
    return this.membershipRepository.findOne(id);
  }
}
