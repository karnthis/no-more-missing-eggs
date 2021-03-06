import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Carton} from '../entities/carton.entity';
import {CreateCartonDto} from '../../dto/carton/inbound/create-carton.dto';
import {KitchenService} from '../../kitchen/services/kitchen.service';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/entities/category.entity';
import {UpdateCartonDto} from '../../dto/carton/inbound/update-carton.dto';
import {CartonDto} from '../../dto/carton/carton.dto';
import {CompleteCartonDto} from '../../dto/carton/outbound/completeCarton.dto';
import {ItemsCartonDto} from '../../dto/carton/outbound/itemsCarton.dto';
import {CategoriesCartonDto} from '../../dto/carton/outbound/categoriesCarton.dto';
import {SavableCartonDto} from '../../dto/carton/inbound/savableCarton.dto';

@Injectable()
export class CartonService {
  constructor(
    @InjectRepository(Carton) private readonly cartonRepository: Repository<Carton>,
    private readonly categoryService: CategoryService,
    private readonly kitchenService: KitchenService,
  ) {}

  async saveNew(createCartonObject: CreateCartonDto): Promise<CartonDto> {
    try {
      const {carton, usedCategories, kitchenId} = createCartonObject;
      const creatableCarton = {...new Carton(), ...carton, ...{status: 'active', lastUpdated: new Date()}};
      creatableCarton.categories = await this.loadCategories(usedCategories);
      creatableCarton.kitchen = await this.kitchenService.findOneFocused(kitchenId);
      return this.cartonRepository.save(creatableCarton);
    } catch (err) {
      throw new HttpException({
        statusCode: 400,
        error: err,
      }, 400);
    }
  }

  async findOneComplete(id: number): Promise<CompleteCartonDto|undefined> {
    return await this.cartonRepository
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.categories', 'category')
        .leftJoinAndSelect('c.items', 'item', `item.status != 'inactive'`)
        .where('c.id = :id')
        .andWhere('c.status != :status')
        // .andWhere('item.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async findOneWithItems(id: number): Promise<ItemsCartonDto|undefined> {
    return await this.cartonRepository
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.items', 'item')
        .where('c.id = :id')
        .andWhere('c.status != :status')
        .andWhere('item.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async findOneWithCategories(id: number): Promise<CategoriesCartonDto|undefined> {
    return await this.cartonRepository
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.categories', 'category')
        .where('c.id = :id')
        .andWhere('c.status != :status')
        .andWhere('category.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  getOne(id: number): Promise<SavableCartonDto|undefined> {
    return this.cartonRepository.findOne(id);
  }

  async updateCarton(id: number, updateItem: UpdateCartonDto): Promise<CartonDto> {
    await this.cartonRepository.update(id, {...updateItem, ...{lastUpdated: new Date()}});
    return this.cartonRepository.findOne(id);
  }

  async deleteCarton(id: number): Promise<CartonDto|undefined> {
    // const toInactivate = await this.cartonRepository.findOne(id);
    // toInactivate.status = 'inactive';
    // toInactivate.lastUpdated = new Date();
    await this.cartonRepository.update(id, {status: 'inactive', lastUpdated: new Date()});
    return this.cartonRepository.findOne(id);
  }

  async loadCategories(ids: number[]): Promise<Category[]> {
    const ret = [];
    for (const id of ids) {
      ret.push(await this.categoryService.getOne(id));
    }
    return ret;
  }
}
