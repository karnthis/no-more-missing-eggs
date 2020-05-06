import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Item} from '../entities/item.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>,
  ) {}

  async saveNew(body) {
    const {kitchenId, item} = body;
    const myKitchenDetails: Kitchen = await this.kitchenRepository.findOne(kitchenId);
    const addedItem = {...new Item(), ...item};
    addedItem.kitchen = myKitchenDetails;

    return await this.itemRepository.save(addedItem);
  }
}
