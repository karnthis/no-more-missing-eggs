import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import {Item} from './entities/item.entity';
import {Kitchen} from '../kitchen/entities/kitchen.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Item, Kitchen]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
