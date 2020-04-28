import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';
import {MembershipService} from "../membership/services/membership.service";
import {MembershipModule} from "../membership/membership.module";
import {Membership} from "../membership/entities/membership.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([Kitchen, Membership]),
      MembershipModule,
  ],
  controllers: [KitchenController],
  providers: [KitchenService, MembershipService],
})
export class KitchenModule {}
