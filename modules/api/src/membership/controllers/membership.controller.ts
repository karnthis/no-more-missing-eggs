import {Controller, UseGuards, Get, Post, Body, Put, Param, Delete} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {MembershipService} from '../services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/create-membership.dto';
import {Membership} from '../entities/membership.entity';
import {UpdateMembershipDto} from '../../dto/membership/update-membership.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Controller('membership')
export class MembershipController {
  constructor(
      private readonly membershipService: MembershipService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMembership(
      @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<Membership> {
    return await this.membershipService.saveNew(createMembershipDto);
}

  // TODO do we need this?
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // getAll(): string {
  //   return 'hello from user';
  // }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateOne(
    @Param() id: number,
    @Body() updateMembership: UpdateMembershipDto,
  ): Promise<Membership> {
    return this.membershipService.update(id, updateMembership);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOne(
    @Param() id: number,
  ): Promise<Membership|undefined> {
    return this.membershipService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOne(
    @Param() id: number,
  ): Promise<DeleteResultsDto> {
    return this.membershipService.deleteOne(id);
  }

}
