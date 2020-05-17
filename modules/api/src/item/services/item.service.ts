import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Item} from '../entities/item.entity';
import {UpdateItemDto} from '../../dto/item/update-item.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/entities/category.entity';
import {CreateItemDto} from '../../dto/item/create-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly categoryService: CategoryService,
  ) {}

  async saveNew(createItemObject: CreateItemDto): Promise<Item> {
    const {item, usedCategories} = createItemObject;
    const creatableItem = {...new Item(), ...item};
    creatableItem.categories = await this.loadCategories(usedCategories);
    return this.itemRepository.save(creatableItem);
  }

  getOne(id: number): Promise<Item|undefined> {
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

  async loadCategories(ids: number[]): Promise<Category[]> {
    const ret = [];
    for (const id of ids) {
      ret.push(await this.categoryService.getOne(id));
    }
    return ret;
  }
}
