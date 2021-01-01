import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Category} from '../entities/category.entity';
import {CreateCategoryDto} from '../../dto/category/inbound/create-category.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';
import {CategoryDto} from '../../dto/category/category.dto';
import {CompleteCategoryDto} from '../../dto/category/outbound/completeCategory.dto';
import {CartonCategoryDto} from '../../dto/category/outbound/cartonCategory.dto';

  // TODO update all of this
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  saveNew(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const addedCategory = {...new Category(), ...createCategoryDto, ...{status: 'active', lastUpdated: new Date()}};
    // this.categoryRepository.save(addedCategory)
    // createCategoryDto.kitchen.metadata

    return this.categoryRepository.save(addedCategory);
  }

  getOne(id: number): Promise<CategoryDto|undefined> {
    return this.categoryRepository.findOne(id);
  }

  async saveDefaults(freshKitchen: KitchenDto) {
    const defaultCategories: string[] = [
      // 'All',
      'Frozen',
      'Refrigerated',
      'Pantry',
    ];
    const baseCategory: CreateCategoryDto = {
      name: '',
      kitchen: freshKitchen,
      cartons: [],
    };
    for (const name of defaultCategories) {
      baseCategory.name = name;
      await this.saveNew(baseCategory);
    }
    return defaultCategories.length;
  }

  async findOneComplete(id: number): Promise<CompleteCategoryDto|undefined> {
    return await this.categoryRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.cartons', 'carton', `carton.status != 'inactive'`)
        .leftJoinAndSelect('carton.items', 'item', `item.status != 'inactive'`)
        .where('c.id = :id')
        .andWhere('c.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async findOneWithCartons(id: number): Promise<CartonCategoryDto|undefined> {
    return await this.categoryRepository
        .createQueryBuilder('c')
        .leftJoinAndSelect('c.cartons', 'carton', `carton.status != 'inactive'`)
        .where('c.id = :id')
        .andWhere('c.status != :status')
        .andWhere('carton.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async delete(id: number): Promise<CategoryDto|undefined> {
    // const toInactivate = await this.categoryRepository.findOne(id);
    // toInactivate.status = 'inactive';
    // toInactivate.lastUpdated = new Date();
    await this.categoryRepository.update(id, {status: 'inactive', lastUpdated: new Date()});
    return this.categoryRepository.findOne(id);
  }
}
