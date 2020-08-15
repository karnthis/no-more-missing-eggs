import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Carton} from '../entities/carton.entity';
import {UpdateItemDto} from '../../dto/item/update-item.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/entities/category.entity';
import {CreateItemDto} from '../../dto/item/create-item.dto';
import {KitchenService} from '../../kitchen/services/kitchen.service';

@Injectable()
export class CartonService {
  constructor(
    @InjectRepository(Carton) private readonly cartonRepository: Repository<Carton>,
  ) {}

  // async saveNew(createItemObject: CreateItemDto): Promise<Item> {
  //   try {
  //     const {item, usedCategories, kitchenId} = createItemObject;
  //     const creatableItem = {...new Item(), ...item, ...{isDelete: false}};
  //     creatableItem.categories = await this.loadCategories(usedCategories);
  //     creatableItem.kitchen = await this.kitchenService.findOneFocused(kitchenId);
  //     return this.itemRepository.save(creatableItem);
  //   } catch (err) {
  //     throw new HttpException({
  //       statusCode: 400,
  //       error: err,
  //     }, 400);
  //   }
  // }
  //
  // async findFullKitchen(id: number): Promise<Item[]> {
  //   // tslint:disable-next-line:no-console
  //   console.log('fetching items for kitchen id', id);
  //   return await this.itemRepository
  //     .createQueryBuilder('items')
  //     .leftJoinAndSelect('items.kitchen', 'kitchen')
  //     .where('kitchen.id = :id', { id })
  //     .getMany();
  // }
  //
  // getOne(id: number): Promise<Item|undefined> {
  //   return this.itemRepository.findOne(id);
  // }
  //
  // async updateItem(id: number, updateItem: UpdateItemDto): Promise<Item> {
  //   await this.itemRepository.update(id, updateItem);
  //   return this.itemRepository.findOne(id);
  // }
  //
  // async deleteItem(id: number): Promise<DeleteResultsDto> {
  //   return this.itemRepository.delete(id);
  // }
  //
  // async loadCategories(ids: number[]): Promise<Category[]> {
  //   const ret = [];
  //   for (const id of ids) {
  //     ret.push(await this.categoryService.getOne(id));
  //   }
  //   return ret;
  // }
}
