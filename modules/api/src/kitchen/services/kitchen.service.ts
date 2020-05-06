import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from '../entities/kitchen.entity';
import {Membership} from '../../membership/entities/membership.entity';
import {User} from '../../user/entities/user.entity';
import {MembershipDto} from '../../dto/membership/membership.dto';
import {CreateKitchenDto} from '../../dto/kitchen/create-kitchen.dto';

@Injectable()
export class KitchenService {
  constructor(
      @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>,
      @InjectRepository(Membership) private readonly membershipRepository: Repository<Membership>,
      @InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async saveNewKitchen(userId: number, createKitchen: CreateKitchenDto, createMembership: MembershipDto) {

    const myUserDetails = await this.userRepository.findOne(userId);
    const addKitchen = {...new Kitchen(), ...createKitchen};
    const savedKitchen = await this.kitchenRepository.save(addKitchen);
    const addMembership = {...new Membership(), ...createMembership};
    addMembership.user = myUserDetails;
    addMembership.kitchen = savedKitchen;

    return this.membershipRepository.save(addMembership);
  }

  // TODO superadmin only
  async findAll(): Promise<Kitchen[]> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .leftJoinAndSelect('k.membership', 'kmembers')
        .leftJoinAndSelect('kmembers.user', 'user')
        .getMany();
  }

  async findOne(id): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .leftJoinAndSelect('k.membership', 'kmembers')
        .leftJoinAndSelect('kmembers.user', 'user')
        .leftJoinAndSelect('k.item', 'items')
        .where('k.id = :id', { id })
        .getOne();
  }

  async saveUpdate(id, replacement): Promise<Kitchen> {
    const oldKitchen = await this.kitchenRepository.findOne(id);
    const kitchenToSave = {...oldKitchen, ...replacement};
    return await this.kitchenRepository.save(kitchenToSave);
  }

  async addRelation(id, relation): Promise<Kitchen> {
    const oldKitchen = await this.kitchenRepository.findOne(id);
    oldKitchen.membership = [...oldKitchen.membership, relation];
    return await this.kitchenRepository.save(oldKitchen);
  }
}
