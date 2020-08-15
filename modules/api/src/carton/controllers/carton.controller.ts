import {Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// import {CreateItemDto} from '../../dto/item/create-item.dto';
import {Item} from '../entities/item.entity';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Controller('item')
export class ItemController {
  constructor(
      private readonly itemService: ItemService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('k/:id')
  getKitchenContents(
    @Param('id') id: number,
  ) {
    return this.itemService.findFullKitchen(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveNew(
    @Body() createItemDto: any, // CreateItemDto,
  ): Promise<Item> {
    return this.itemService.saveNew(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(
    @Param('id') id: number,
  ): Promise<Item> {
    const item = await this.itemService.getOne(id);
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
  async updateItem(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<Item> {
    const item = await this.itemService.updateItem(id, body);
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
    return this.itemService.deleteItem(id);
  }

}
