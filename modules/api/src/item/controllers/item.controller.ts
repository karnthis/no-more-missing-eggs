import { Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {CreateItemDto} from '../../dto/item/create-item.dto';
import {Item} from '../entities/item.entity';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Controller('item')
export class ItemController {
  constructor(
      private readonly itemService: ItemService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveNew(
    @Body() createItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemService.saveNew(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(
    @Param('id') id: number,
  ): Promise<Item|undefined> {
    return this.itemService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<Item> {
    return this.itemService.updateItem(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteItem(
    @Param('id') id: number,
  ): Promise<DeleteResultsDto> {
    return this.itemService.deleteItem(id);
  }

}
