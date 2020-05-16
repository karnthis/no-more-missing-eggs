import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Item} from '../entities/item.entity';
import {ItemDto} from '../../dto/item/item.dto';
import {UpdateItemDto} from '../../dto/item/update-item.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async saveNew(item: ItemDto): Promise<Item> {
    const creatableItem = {...new Item(), ...item};
    return this.itemRepository.save(creatableItem);
  }

  async getOne(id: number): Promise<Item|undefined> {
    return this.itemRepository.findOne(id);
  }

  async updateItem(id: number, updateItem: UpdateItemDto): Promise<Item> {
    const {added, ...updatableItem} = updateItem;
    await this.itemRepository.update(id, updatableItem);
    return this.itemRepository.findOne(id);
  }

  async deleteItem(id: number): Promise<DeleteResultsDto> {
    return this.itemRepository.delete(id);
  }

}
