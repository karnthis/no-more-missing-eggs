import {Controller, UseGuards, Get, Post, Body} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {MembershipService} from '../services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';

@Controller('membership')
export class MembershipController {
  constructor(
      private readonly membershipService: MembershipService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMembership(
      @Body() createMembershipDto: CreateMembershipDto,
  ) {
    return await this.membershipService.saveNew(createMembershipDto);
}

  // TODO do we need this?
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return 'hello from user';
  }

}
