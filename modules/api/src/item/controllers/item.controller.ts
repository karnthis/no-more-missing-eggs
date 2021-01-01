import {Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {Item} from '../entities/item.entity';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ItemDto} from '../../dto/item/item.dto';

@Controller('item')
@HttpErrors()
@ApiTags('Item')
export class ItemController {
  constructor(
      private readonly itemService: ItemService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'The Item has been successfully created.', type: Item})
  async saveNew(
    @Body() createItemDto: any, // CreateItemDto,
  ): Promise<ItemDto> {
    return this.itemService.saveNew(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: Item })
  async getOne(
    @Param('id') id: number,
  ): Promise<ItemDto|undefined> {
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
  @Get('/bycarton/:id')
  @ApiOkResponse({ type: Item })
  async getMany(
      @Param('id') id: number,
  ): Promise<ItemDto[]> {
    const item = await this.itemService.getMany(id);
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
  @ApiOkResponse({ type: Item })
  async updateItem(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<ItemDto> {
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
  @ApiOkResponse({ type: Item })
  async deleteItem(
    @Param('id') id: number,
  ): Promise<ItemDto> {
    return this.itemService.deleteItem(id);
  }

}
