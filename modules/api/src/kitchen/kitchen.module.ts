import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Kitchen])],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
