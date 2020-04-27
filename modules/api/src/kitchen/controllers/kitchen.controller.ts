import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { KitchenService } from '../services/kitchen.service';

@Controller('ingredient')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  // TODO do we need this?
  @Get()
  getAll() {
    return this.kitchenService.findAll();
  }

  // @Post()
  // saveNew(@Body() createIngredientDto: CreateIngredientDto) {
  //   this.kitchenService.saveNew(createIngredientDto);
  //   return 'done';
  // }

  @Get('one/:id')
  getOne(@Param('id') id: string) {
    return this.kitchenService.findOne(id);
  }

  // @Put('one/:id')
  // updateExisting(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
  //   return this.kitchenService.saveUpdate(id, updateIngredientDto);
  // }

  @Delete('one/:id')
  deleteOne(@Param('id') id: string) {
    return this.kitchenService.delete(id);
  }

  @Get(':owner')
  getMine(@Param('owner') owner: string) {
    return this.kitchenService.findSome(owner);
  }
}
