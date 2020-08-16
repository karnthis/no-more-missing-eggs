import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from '../entities/kitchen.entity';
import {CreateKitchenDto} from '../../dto/kitchen/create-kitchen.dto';
import {MembershipService} from '../../membership/services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';
import {CategoryService} from '../../category/services/category.service';
import {UpdateKitchenDto} from '../../dto/kitchen/update-kitchen.dto';

@Injectable()
export class KitchenService {
  constructor(
      @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>,
      private readonly membershipService: MembershipService,
      private readonly categoryService: CategoryService,
  ) {}

  async saveNewKitchen(createKitchen: CreateKitchenDto) {
    try {
      const {userId, savableKitchen, membership} = createKitchen;
      const addKitchen = {...new Kitchen(), ...savableKitchen, ...{status: 'active', lastUpdated: new Date()}};
      const savedKitchen = await this.kitchenRepository.save(addKitchen);

      const createMembership: CreateMembershipDto = {
        userId,
        myKitchen: savedKitchen,
        membership,
      };

      await this.membershipService.saveNew(createMembership);
      await this.categoryService.saveDefaults(savedKitchen);

      return this.findOneExpanded(savedKitchen.id);
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }

  }

  async saveNewKitchenMembership(kitchenBundle) {
    try {
      const {userId, kitchenId, membership} = kitchenBundle;
      const parentKitchen = await this.findOneFocused(kitchenId);
      const createMembership: CreateMembershipDto = {
        userId,
        myKitchen: parentKitchen,
        membership,
      };
      await this.membershipService.saveNew(createMembership);

      return this.findOneExpanded(parentKitchen.id);
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }

  }

  async findMine(id: number): Promise<Kitchen[]> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.membership', 'kmembers')
        .innerJoinAndSelect('kmembers.user', 'user')
        .where('user.id = :id', { id })
        .where('k.status != `inactive`')
        .getMany();
  }

  async findMyIds(id: number): Promise<Kitchen[]> {
    return await this.kitchenRepository
      .createQueryBuilder('k')
      .select('k.id')
      .innerJoin('k.membership', 'kmembers')
      .innerJoin('kmembers.user', 'user')
      .where('user.id = :id', { id })
      .where('k.status != `inactive`')
      .getMany();
  }

  async findOneExpanded(id: number): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.membership', 'kmembers')
        .innerJoinAndSelect('kmembers.user', 'user')
        .where('k.id = :id', { id })
        .where('k.status != `inactive`')
        .where('kmembers.status != `inactive`')
        .getOne();
  }

  async findOneFocused(id: number): Promise<Kitchen|undefined> {
    return this.kitchenRepository.findOne(id);
  }

  async saveUpdate(id: number, replacement: UpdateKitchenDto): Promise<Kitchen|undefined> {
    await this.kitchenRepository.update(id, {...replacement, ...{lastUpdated: new Date()}});
    return this.kitchenRepository.findOne(id);
  }

  async delete(id: number): Promise<any> {
    const toInactivate = await this.kitchenRepository.findOne(id);
    toInactivate.status = 'inactive';
    toInactivate.lastUpdated = new Date();
    await this.kitchenRepository.update(id, toInactivate);
    return this.kitchenRepository.findOne(id);
  }

}
