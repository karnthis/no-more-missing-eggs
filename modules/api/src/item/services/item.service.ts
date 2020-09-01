import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Item} from '../entities/item.entity';
import {UpdateItemDto} from '../../dto/item/inbound/update-item.dto';
import {CreateItemDto} from '../../dto/item/inbound/create-item.dto';
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
