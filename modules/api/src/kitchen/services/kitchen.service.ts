import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from '../entities/kitchen.entity';
import {CreateKitchenDto} from '../../dto/kitchen/create-kitchen.dto';
import {MembershipService} from '../../membership/services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';
import {CategoryService} from '../../category/services/category.service';
import {UpdateKitchenDto} from '../../dto/kitchen/update-kitchen.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

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
      const addKitchen = {...new Kitchen(), ...savableKitchen};
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

  // TODO superadmin only
  async findAll(): Promise<Kitchen[]> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .leftJoinAndSelect('k.membership', 'kmembers')
        .leftJoinAndSelect('kmembers.user', 'user')
        .getMany();
  }

  async findOneExpanded(id): Promise<Kitchen|undefined> {
    return await this.kitchenRepository
        .createQueryBuilder('k')
        .leftJoinAndSelect('k.membership', 'kmembers')
        .leftJoinAndSelect('kmembers.user', 'user')
        .leftJoinAndSelect('k.category', 'category')
        .where('k.id = :id', { id })
        .getOne();
  }

  async findOneFocused(id): Promise<Kitchen|undefined> {
    return this.kitchenRepository.findOne(id);
  }

  async saveUpdate(id: number, replacement: UpdateKitchenDto): Promise<Kitchen|undefined> {
    await this.kitchenRepository.update(id, replacement);
    return this.kitchenRepository.findOne(id);
  }

  async delete(id: number): Promise<DeleteResultsDto> {
    return this.kitchenRepository.delete(id);
  }

}
