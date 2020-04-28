
import { Module } from '@nestjs/common';
import { MembershipService } from './services/membership.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membership])],
  providers: [MembershipService],
  controllers: [],
  exports: [MembershipService],
})
export class MembershipModule {}
