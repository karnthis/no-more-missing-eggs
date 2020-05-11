import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';
import {MembershipModule} from '../membership/membership.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kitchen]),
    MembershipModule,
  ],
  controllers: [KitchenController],
  providers: [KitchenService],
  exports: [KitchenService],
})
export class KitchenModule {}
