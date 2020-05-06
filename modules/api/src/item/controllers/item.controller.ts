import { Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {CreateItemDto} from '../../dto/item/create-item.dto';

@Controller('item')
export class ItemController {
  constructor(
      private readonly itemService: ItemService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveNew(
    @Body() { kitchenId, item}: CreateItemDto,
  ) {
    return this.itemService.saveNew(kitchenId, item);
  }

}
