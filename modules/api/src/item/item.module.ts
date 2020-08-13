import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import {Item} from './entities/item.entity';
import {CategoryModule} from '../category/category.module';
import {KitchenModule} from '../kitchen/kitchen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    CategoryModule,
    KitchenModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
