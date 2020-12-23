import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';
import {MembershipModule} from '../membership/membership.module';
import {CategoryModule} from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kitchen]),
    MembershipModule,
    CategoryModule,
  ],
  controllers: [KitchenController],
  providers: [KitchenService],
  exports: [KitchenService],
})
export class KitchenModule {}
