import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Item} from '../entities/item.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {ItemDto} from '../../dto/item/item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    @InjectRepository(Kitchen) private readonly kitchenRepository: Repository<Kitchen>,
  ) {}

  async saveNew(kitchenId: number, createItem: ItemDto) {

    const myKitchenDetails: Kitchen = await this.kitchenRepository.findOne(kitchenId);
    const addedItem = {...new Item(), ...createItem};
    addedItem.kitchen = myKitchenDetails;

    const item: Item = await this.itemRepository.save(addedItem);
    return item;
  }
}