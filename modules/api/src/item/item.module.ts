import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import {Item} from './entities/item.entity';
import {CartonModule} from '../carton/carton.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    CartonModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
