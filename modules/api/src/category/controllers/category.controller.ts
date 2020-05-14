import { Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {CreateItemDto} from '../../dto/item/create-item.dto';

@Controller('category')
export class CategoryController {
  constructor(
      private readonly categoryService: CategoryService,
  ) {}

  // TODO update this
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async saveNew(
  //   @Body() createItemDto: CreateItemDto,
  // ): Promise<Item> {
  //   return this.categoryService.saveNew();
  // }

}
