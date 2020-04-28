import { Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { KitchenService } from '../services/kitchen.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {MembershipService} from '../../membership/services/membership.service';
import {INewMembership} from '../../membership/interfaces/newMembership.interface';
import {INewKitchen} from '../interfaces/newKitchen.interface';
import {Membership} from '../../membership/entities/membership.entity';
import {Kitchen} from '../entities/kitchen.entity';

@Controller('kitchen')
export class KitchenController {
  constructor(
      private readonly kitchenService: KitchenService,
      private readonly membershipService: MembershipService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveNew(@Request() req) {
    const kitchenToMake: INewKitchen = {
      ownerId: req.user.sub.id,
      name: req.body.name || `${req.user.sub.firstName}'s Kitchen`,
    };
    const myKitchen: Kitchen = await this.kitchenService.saveNewKitchen(kitchenToMake);
    const membershipToMake: INewMembership = {
      kitchenId: myKitchen.id,
      memberId: req.user.sub.id,
      role: 'admin',
    };
    const myMembership: Membership = await this.membershipService.saveNewMembership(membershipToMake);

  }

  // TODO do we need this?
  @Get()
  getAll() {
    return 'hello from kitchen';
  }

  // // @Post()
  // // saveNew(@Body() createIngredientDto: CreateIngredientDto) {
  // //   this.kitchenService.saveNew(createIngredientDto);
  // //   return 'done';
  // // }

  @Get('one/:id')
  getOne(@Param('id') id: string) {
    return this.kitchenService.findOne(id);
  }

  // // @Put('one/:id')
  // // updateExisting(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
  // //   return this.kitchenService.saveUpdate(id, updateIngredientDto);
  // // }

  // @Delete('one/:id')
  // deleteOne(@Param('id') id: string) {
  //   return this.kitchenService.delete(id);
  // }

  // @Get(':owner')
  // getMine(@Param('owner') owner: string) {
  //   return this.kitchenService.findSome(owner);
  // }
}
