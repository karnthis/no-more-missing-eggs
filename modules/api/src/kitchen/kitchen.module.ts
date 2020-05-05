import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kitchen } from './entities/kitchen.entity';
import { KitchenService } from './services/kitchen.service';
import { KitchenController } from './controllers/kitchen.controller';
import {MembershipService} from '../membership/services/membership.service';
import {MembershipModule} from '../membership/membership.module';
import {Membership} from '../membership/entities/membership.entity';
import {UserService} from '../user/services/user.service';
import {User} from '../user/entities/user.entity';
import {UserModule} from '../user/user.module';
import {Item} from '../item/entities/item.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Kitchen, Item, Membership, User]),
      MembershipModule,
      UserModule,
  ],
  controllers: [KitchenController],
  providers: [KitchenService, MembershipService, UserService],
})
export class KitchenModule {}
