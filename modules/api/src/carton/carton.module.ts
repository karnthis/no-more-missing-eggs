import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartonService } from './services/carton.service';
import { CartonController } from './controllers/carton.controller';
import {Carton} from './entities/carton.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carton]),
  ],
  controllers: [CartonController],
  providers: [CartonService],
})
export class CartonModule {}
