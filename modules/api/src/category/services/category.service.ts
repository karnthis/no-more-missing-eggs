import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Category} from '../entities/category.entity';
import {CreateCategoryDto} from '../../dto/category/create-category.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';

  // TODO update all of this
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
  ) {}

  saveNew(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const addedCategory = {...new Category(), ...createCategoryDto};
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
      categoryName: '',
      kitchen: freshKitchen,
      items: [],
    };
    for (const name of defaultCategories) {
      baseCategory.categoryName = name;
      await this.saveNew(baseCategory);
    }
    return true;
  }
}
