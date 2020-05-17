
import {HttpException, Injectable} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import {User} from '../../user/entities/user.entity';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';
import {UserService} from '../../user/services/user.service';
import {UpdateMembershipDto} from '../../dto/membership/update-membership.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Injectable()
export class MembershipService {

  constructor(
      @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
      private readonly userService: UserService,
  ) {}

  // Used on Kitchen creation and to add new relations
  async saveNew(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    try {
      const {userId, myKitchen, membership} = createMembershipDto;
      const myUserDetails: User = await this.userService.findOneById(userId);

      const addedMembership = {...new Membership(), ...membership};
      addedMembership.user = myUserDetails;
      addedMembership.kitchen = myKitchen;

      return await this.membershipRepository.save(addedMembership);
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }
  }

  async getOne(id: number): Promise<Membership|undefined> {
    return await this.membershipRepository.findOne(id);
  }

  async update(id: number, updateMembership: UpdateMembershipDto): Promise<Membership> {
    await this.membershipRepository.update(id, updateMembership);
    return this.membershipRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<DeleteResultsDto> {
    return await this.membershipRepository.delete(id);
  }
}
