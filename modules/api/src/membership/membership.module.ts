
import { Module } from '@nestjs/common';
import { MembershipService } from './services/membership.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import {MembershipController} from './controllers/membership.controller';
import {Kitchen} from '../kitchen/entities/kitchen.entity';
import {User} from '../user/entities/user.entity';
import {UserModule} from '../user/user.module';
import {KitchenModule} from '../kitchen/kitchen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Kitchen, Membership, User]),
    UserModule,
    KitchenModule,
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
