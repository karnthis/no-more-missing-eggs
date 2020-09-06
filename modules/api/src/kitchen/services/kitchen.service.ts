import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from '../entities/kitchen.entity';
import {CreateKitchenDto} from '../../dto/kitchen/inbound/create-kitchen.dto';
import {MembershipService} from '../../membership/services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/inbound/create-membership.dto';
import {CategoryService} from '../../category/services/category.service';
import {UpdateKitchenDto} from '../../dto/kitchen/inbound/update-kitchen.dto';
import {ExpandedKitchenDto} from '../../dto/kitchen/outbound/expandedKitchen.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';
import {IdKitchenDto} from '../../dto/kitchen/outbound/idKitchen.dto';

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

  async findMine(id: number): Promise<ExpandedKitchenDto[]> {
    return await this.kitchenRepository
      .createQueryBuilder('k')
      .innerJoinAndSelect('k.memberships', 'kmembers')
      .innerJoinAndSelect('kmembers.user', 'user')
      .where('user.id = :id')
      .andWhere('k.status != :status')
      .setParameters({ status: 'inactive', id })
      .getMany();
  }

  async findMyIds(id: number): Promise<IdKitchenDto[]> {
    return await this.kitchenRepository
      .createQueryBuilder('k')
      .select('k.id')
      .innerJoin('k.memberships', 'kmembers')
      .innerJoin('kmembers.user', 'user')
      .where('user.id = :id')
      .andWhere('k.status != :status')
      .setParameters({ status: 'inactive', id })
      .getMany();
  }

  async findOneExpanded(id: number): Promise<ExpandedKitchenDto|undefined> {
    return await this.kitchenRepository
      .createQueryBuilder('k')
      .innerJoinAndSelect('k.memberships', 'kmembers')
      .innerJoinAndSelect('kmembers.user', 'user')
      .where('k.id = :id')
      .andWhere('k.status != :status')
      .andWhere('kmembers.status != :status')
      .setParameters({ status: 'inactive', id })
      .getOne();
  }

  // todo: add DTO
  async findOneComplete(id: number): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.cartons', 'carton')
        .innerJoinAndSelect('carton.categories', 'category')
        .innerJoinAndSelect('carton.items', 'item')
        .where('k.id = :id')
        .andWhere('k.status != :status')
        .andWhere('carton.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  // todo: add DTO
  async findOneWithCartons(id: number): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.cartons', 'carton')
        .innerJoinAndSelect('carton.categories', 'category')
        .where('k.id = :id')
        .andWhere('k.status != :status')
        .andWhere('carton.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  // todo: add DTO
  async findOneWithCategories(id: number): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.categories', 'category')
        .where('k.id = :id')
        .andWhere('k.status != :status')
        .andWhere('category.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async findOneWithMembers(id: number): Promise<ExpandedKitchenDto|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.memberships', 'membership')
        .innerJoinAndSelect('membership.user', 'user')
        .where('k.id = :id')
        .andWhere('k.status != :status')
        .andWhere('membership.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async findOneMeta(id: number): Promise<KitchenDto|undefined> {
    const kitchen = await this.kitchenRepository
        .createQueryBuilder('k')
        .innerJoinAndSelect('k.cartons', 'carton')
        .where('k.id = :id')
        .andWhere('k.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
    const metadata = {cartonCount: kitchen.cartons.length};
    await this.kitchenRepository.update(id, {metadata, lastUpdated: new Date()});
    return this.kitchenRepository.findOne(id);
  }

  // todo: add DTO
  async findOneFocused(id: number): Promise<Kitchen|undefined> {
    return this.kitchenRepository.findOne(id);
  }

  async saveUpdate(id: number, replacement: UpdateKitchenDto): Promise<Kitchen|undefined> {
    await this.kitchenRepository.update(id, {...replacement, ...{lastUpdated: new Date()}});
    return this.kitchenRepository.findOne(id);
  }

  async delete(id: number): Promise<KitchenDto> {
    const toInactivate = await this.kitchenRepository.findOne(id);
    toInactivate.status = 'inactive';
    toInactivate.lastUpdated = new Date();
    await this.kitchenRepository.update(id, toInactivate);
    return this.kitchenRepository.findOne(id);
  }

}
