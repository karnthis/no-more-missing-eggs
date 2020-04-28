
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import {INewMembership} from '../interfaces/newMembership.interface';

@Injectable()
export class MembershipService {

  constructor(@InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>) {}

  async findUserMemberships(memberId: number): Promise<Membership[]> {
    return this.membershipRepository.find({where: {memberId}});
  }

  async findMembershipUsers(kitchenId: number): Promise<Membership[]> {
    return this.membershipRepository.find({where: {kitchenId}});
  }

  async saveNewMembership(createMembership: INewMembership): Promise<Membership> {
    const tmp = new Membership();
    const membershipToSave = {...tmp, ...createMembership};
    return await this.membershipRepository.save(membershipToSave);
    // .catch(err => ({error: err}));
  }
}
