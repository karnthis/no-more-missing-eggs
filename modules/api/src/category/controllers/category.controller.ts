import {
  Controller,
  UseGuards,
  Get,
  Param,
  HttpException,
  HttpStatus, Delete,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {Category} from '../entities/category.entity';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {CompleteCategoryDto} from '../../dto/category/outbound/completeCategory.dto';
import {CartonCategoryDto} from '../../dto/category/outbound/cartonCategory.dto';

@Controller('category')
@HttpErrors()
@ApiTags('Category')
export class CategoryController {
  constructor(
      private readonly categoryService: CategoryService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/f/:id')
  @ApiOkResponse({ type: Category })
  async getFullOne(
      @Param('id') id: number,
  ): Promise<CompleteCategoryDto> {
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
  @ApiOkResponse({ type: Category })
  async getCartonOne(
      @Param('id') id: number,
  ): Promise<CartonCategoryDto> {
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({  })
  async deleteKitchen(
      @Param('id') id: number,
  ): Promise<any> {
    return await this.categoryService.delete(id);
  }

}
