import {Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { CartonService } from '../services/carton.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {Carton} from '../entities/carton.entity';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {CartonDto} from '../../dto/carton/carton.dto';
import {CompleteCartonDto} from '../../dto/carton/outbound/completeCarton.dto';
import {ItemsCartonDto} from '../../dto/carton/outbound/itemsCarton.dto';
import {CategoriesCartonDto} from '../../dto/carton/outbound/categoriesCarton.dto';

@Controller('carton')
@HttpErrors()
@ApiTags('Carton')
export class CartonController {
  constructor(
      private readonly cartonService: CartonService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'The Carton has been successfully created.', type: Carton})
  async saveNew(
    @Body() createCartonDto: any, // CreateItemDto,
  ): Promise<CartonDto> {
    return this.cartonService.saveNew(createCartonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: Carton })
  async getOne(
    @Param('id') id: number,
  ): Promise<CartonDto> {
    const carton = await this.cartonService.getOne(id);
    if (carton) {
      return carton;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Carton Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/f/:id')
  @ApiOkResponse({ type: Carton })
  async getFullOne(
      @Param('id') id: number,
  ): Promise<CompleteCartonDto> {
    const foundCarton = await this.cartonService.findOneComplete(id);
    if (foundCarton) {
      return foundCarton;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Carton Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/i/:id')
  @ApiOkResponse({ type: Carton })
  async getItemsOne(
      @Param('id') id: number,
  ): Promise<ItemsCartonDto> {
    const foundCarton = await this.cartonService.findOneWithItems(id);
    if (foundCarton) {
      return foundCarton;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Carton Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/c/:id')
  @ApiOkResponse({ type: Carton })
  async getCategoriesOne(
      @Param('id') id: number,
  ): Promise<CategoriesCartonDto> {
    const foundCarton = await this.cartonService.findOneWithCategories(id);
    if (foundCarton) {
      return foundCarton;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Carton Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({ type: Carton })
  async updateCarton(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<CartonDto> {
    const carton = await this.cartonService.updateCarton(id, body);
    if (carton) {
      return carton;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Carton Found to Update',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ type: Carton })
  async deleteCarton(
    @Param('id') id: number,
  ): Promise<CartonDto> {
    return this.cartonService.deleteCarton(id);
  }

}
