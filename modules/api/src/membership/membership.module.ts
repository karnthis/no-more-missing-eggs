
import { Module } from '@nestjs/common';
import { MembershipService } from './services/membership.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import {MembershipController} from './controllers/membership.controller';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membership]),
    UserModule,
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
