import {Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { CartonService } from '../services/carton.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {Carton} from '../entities/carton.entity';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Controller('carton')
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
  @Put(':id')
  async updateCarton(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<Carton> {
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
  async deleteCarton(
    @Param('id') id: number,
  ): Promise<any> {
    return this.cartonService.deleteCarton(id);
  }

}
