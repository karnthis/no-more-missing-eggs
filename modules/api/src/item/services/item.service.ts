import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Item} from '../entities/item.entity';
import {UpdateItemDto} from '../../dto/item/update-item.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {Category} from '../../category/entities/category.entity';
import {CreateItemDto} from '../../dto/item/create-item.dto';
import {CartonService} from '../../carton/services/carton.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly cartonService: CartonService,
  ) {}

  async saveNew(createItemObject: CreateItemDto): Promise<Item> {
    try {
      const {item, cartonId} = createItemObject;
      const creatableItem = {...new Item(), ...item, ...{status: 'active', lastUpdated: new Date()}};
      creatableItem.carton = await this.cartonService.getOne(cartonId);
      return this.itemRepository.save(creatableItem);
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }
  }

  async findFullKitchen(id: number): Promise<Item[]> {
    // tslint:disable-next-line:no-console
    console.log('fetching items for kitchen id', id);
    return await this.itemRepository
      .createQueryBuilder('items')
      .leftJoinAndSelect('items.kitchen', 'kitchen')
      .where('kitchen.id = :id', { id })
      .getMany();
  }

  getOne(id: number): Promise<Item|undefined> {
    return this.itemRepository.findOne(id);
  }

  async updateItem(id: number, updateItem: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, {...updateItem, ...{lastUpdated: new Date()}});
    return this.itemRepository.findOne(id);
  }

  async deleteItem(id: number): Promise<any> {
    const toInactivate = await this.itemRepository.findOne(id);
    toInactivate.status = 'inactive';
    toInactivate.lastUpdated = new Date();
    await this.itemRepository.update(id, toInactivate);
    return this.itemRepository.findOne(id);
  }

}
