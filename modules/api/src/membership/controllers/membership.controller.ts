import {Controller, UseGuards, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {MembershipService} from '../services/membership.service';
import {CreateMembershipDto} from '../../dto/membership/inbound/create-membership.dto';
import {Membership} from '../entities/membership.entity';
import {UpdateMembershipDto} from '../../dto/membership/inbound/update-membership.dto';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiCreatedResponse, ApiTags} from '@nestjs/swagger';
import {MembershipDto} from '../../dto/membership/membership.dto';

@Controller('membership')
@HttpErrors()
@ApiTags('Membership')
export class MembershipController {
  constructor(
      private readonly membershipService: MembershipService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiCreatedResponse({ description: 'The Kitchen has been successfully created.', type: MembershipDto})
  async createMembership(
      @Body() createMembershipDto: CreateMembershipDto,
  ): Promise<MembershipDto> {
    return await this.membershipService.saveNew(createMembershipDto);
}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(
    @Param() id: number,
  ): Promise<MembershipDto> {
    const membership = await this.membershipService.getOne(id);
    if (membership) {
      return membership;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Membership Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateOne(
    @Param() id: number,
    @Body() updateMembership: UpdateMembershipDto,
  ): Promise<MembershipDto> {
    const membership = await this.membershipService.update(id, updateMembership);
    if (membership) {
      return membership;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No Membership Found to Update',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOne(
    @Param() id: number,
  ): Promise<MembershipDto> {
    return this.membershipService.deleteOne(id);
  }

}
