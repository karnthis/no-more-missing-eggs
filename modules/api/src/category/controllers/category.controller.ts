import {
  Controller,
  UseGuards,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {Category} from '../entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(
      private readonly categoryService: CategoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/f/:id')
  async getFullOne(
      @Param('id') id: number,
  ): Promise<Category> {
    const foundCategory = await this.categoryService.findOneComplete(id);
    if (foundCategory) {
      return foundCategory;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Category Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/c/:id')
  async getCartonOne(
      @Param('id') id: number,
  ): Promise<Category> {
    const foundCategory = await this.categoryService.findOneWithCartons(id);
    if (foundCategory) {
      return foundCategory;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Category Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

}
