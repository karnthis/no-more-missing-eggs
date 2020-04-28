import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kitchen } from '../entities/kitchen.entity';
import {INewKitchen} from '../interfaces/newKitchen.interface';

@Injectable()
export class KitchenService {
  constructor(
      @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>) {}

  async saveNewKitchen(createKitchen: INewKitchen): Promise<Kitchen> {
    const tmp = new Kitchen();
    const kitchenToSave = {...tmp, ...createKitchen};
    return await this.kitchenRepository.save(kitchenToSave);
    // .catch(err => ({error: err}));
  }

  // TODO superadmin only
  // findAll(): Promise<Kitchen[]> {
  //   return this.kitchenRepository.find();
  // }

  // findSome(owner): Promise<Kitchen[]> {
  //   return this.kitchenRepository.find({ where: { owner } });
  // }

  findOne(id) {
    return 'thingy';
    // return this.kitchenRepository.findOne(id);
  }

  // saveNew(ingr) {
  //   return this.kitchenRepository.save(ingr);
  // }

  // async saveUpdate(id, ingr) {
  //   const fromDb = await this.kitchenRepository.findOne(id);
  //   const toUpdate = { ...fromDb, ingr };
  //   return await this.kitchenRepository.save(toUpdate);
  // }

  // async delete(id) {
  //   const toRemove = await this.kitchenRepository.findOne(id);
  //   return await this.kitchenRepository.remove(toRemove);
  // }
}
