import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Category} from '../entities/category.entity';
import {CreateCategoryDto} from '../../dto/category/inbound/create-category.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';

  // TODO update all of this
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  saveNew(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const addedCategory = {...new Category(), ...createCategoryDto, ...{status: 'active', lastUpdated: new Date()}};
    return this.categoryRepository.save(addedCategory);
  }

  getOne(id: number): Promise<Category|undefined> {
    return this.categoryRepository.findOne(id);
  }

  async saveDefaults(freshKitchen: KitchenDto) {
    const defaultCategories: string[] = [
      'All',
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
    return true;
  }

  async findOneComplete(id: number): Promise<Category|undefined> {
    return await this.categoryRepository
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.cartons', 'carton')
        .innerJoinAndSelect('carton.items', 'item')
        .where('c.id = :id')
        .andWhere('c.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async findOneWithCartons(id: number): Promise<Category|undefined> {
    return await this.categoryRepository
        .createQueryBuilder('c')
        .innerJoinAndSelect('c.cartons', 'carton')
        .where('c.id = :id')
        .andWhere('c.status != :status')
        .andWhere('carton.status != :status')
        .setParameters({ status: 'inactive', id })
        .getOne();
  }

  async delete(id: number): Promise<Category|undefined> {
    // const toInactivate = await this.categoryRepository.findOne(id);
    // toInactivate.status = 'inactive';
    // toInactivate.lastUpdated = new Date();
    await this.categoryRepository.update(id, {status: 'inactive', lastUpdated: new Date()});
    return this.categoryRepository.findOne(id);
  }
}
