import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import {Item} from './entities/item.entity';
import {CategoryModule} from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    CategoryModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
