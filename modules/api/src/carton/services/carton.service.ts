import {HttpException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Carton} from '../entities/carton.entity';
import {CreateCartonDto} from '../../dto/carton/create-carton.dto';
import {KitchenService} from '../../kitchen/services/kitchen.service';
import {CategoryService} from '../../category/services/category.service';
import {Category} from '../../category/entities/category.entity';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {UpdateCartonDto} from '../../dto/carton/update-carton.dto';

@Injectable()
export class CartonService {
  constructor(
    @InjectRepository(Carton) private readonly cartonRepository: Repository<Carton>,
    private readonly categoryService: CategoryService,
    private readonly kitchenService: KitchenService,
  ) {}

  async saveNew(createCartonObject: CreateCartonDto): Promise<Carton> {
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

  getOne(id: number): Promise<Carton|undefined> {
    return this.cartonRepository.findOne(id);
  }

  async updateCarton(id: number, updateItem: UpdateCartonDto): Promise<Carton> {
    await this.cartonRepository.update(id, {...updateItem, ...{lastUpdated: new Date()}});
    return this.cartonRepository.findOne(id);
  }

  async deleteCarton(id: number): Promise<any> {
    const toInactivate = await this.cartonRepository.findOne(id);
    toInactivate.status = 'inactive';
    await this.cartonRepository.update(id, toInactivate);
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