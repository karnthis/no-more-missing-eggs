import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartonService } from './services/carton.service';
import { CartonController } from './controllers/carton.controller';
import {Carton} from './entities/carton.entity';
import {KitchenModule} from '../kitchen/kitchen.module';
import {CategoryModule} from '../category/category.module';
import {KitchenService} from '../kitchen/services/kitchen.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carton]),
    KitchenModule,
    CategoryModule,
  ],
  controllers: [CartonController],
  providers: [CartonService],
  exports: [CartonService],
})
export class CartonModule {}
