import {Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { CartonService } from '../services/carton.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {Carton} from '../entities/carton.entity';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Controller('item')
export class CartonController {
  constructor(
      private readonly cartonService: CartonService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveNew(
    @Body() createCartonDto: any, // CreateItemDto,
  ): Promise<Carton> {
    return this.cartonService.saveNew(createCartonDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(
    @Param('id') id: number,
  ): Promise<Carton> {
    const item = await this.cartonService.getOne(id);
    if (item) {
      return item;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Item Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCarton(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<Carton> {
    const item = await this.cartonService.updateCarton(id, body);
    if (item) {
      return item;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Item Found to Update',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteItem(
    @Param('id') id: number,
  ): Promise<DeleteResultsDto> {
    return this.cartonService.deleteItem(id);
  }

}
