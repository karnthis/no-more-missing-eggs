import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from '../entities/kitchen.entity';
import {CreateKitchenDto} from '../../dto/kitchen/create-kitchen.dto';
import {MembershipService} from '../../membership/services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';

@Injectable()
export class KitchenService {
  constructor(
      @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>,
      private readonly membershipService: MembershipService,
  ) {}

  async saveNewKitchen(createKitchen: CreateKitchenDto) {

    const {userId, savableKitchen, membership} = createKitchen;

    const addKitchen = {...new Kitchen(), ...savableKitchen};
    const savedKitchen = await this.kitchenRepository.save(addKitchen);

    const createMembership: CreateMembershipDto = {
      userId,
      myKitchen: savedKitchen,
      membership,
    };

    return this.membershipService.saveNew(createMembership);
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

  async findOneDetails(id): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
      .createQueryBuilder('k')
      .where('k.id = :id', { id })
      .getOne();
  }

  async saveUpdate(id, replacement): Promise<Kitchen> {
    const oldKitchen = await this.kitchenRepository.findOne(id);
    const kitchenToSave = {...oldKitchen, ...replacement};
    return await this.kitchenRepository.save(kitchenToSave);
  }

  // TODO: move this to membership
  async addRelation(id, relation): Promise<Kitchen> {
    const oldKitchen = await this.kitchenRepository.findOne(id);
    oldKitchen.membership = [...oldKitchen.membership, relation];
    return await this.kitchenRepository.save(oldKitchen);
  }
}
