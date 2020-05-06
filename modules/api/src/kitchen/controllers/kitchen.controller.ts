import {Body, Controller, Get, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {KitchenService} from '../services/kitchen.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {CreateKitchenDto} from '../../dto/kitchen/create-kitchen.dto';
import {MembershipDto} from '../../dto/membership/membership.dto';
import {Membership} from '../../membership/entities/membership.entity';
import {Kitchen} from '../entities/kitchen.entity';
import {UpdateKitchenDto} from '../../dto/kitchen/update-kitchen.dto';

@Controller('kitchen')
export class KitchenController {
    constructor(
        private readonly kitchenService: KitchenService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async saveNew(
        @Request() req,
        @Body() createKitchenDTO: CreateKitchenDto,
    ): Promise<Membership> {
        const membershipToMake: MembershipDto = {
            role: 'Owner',
        };
        return await this.kitchenService.saveNewKitchen(req.user.sub.id, createKitchenDTO, membershipToMake);

    }

    // TODO do we need this?
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return 'hello from kitchen';
    }

    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Kitchen|undefined> {
        return await this.kitchenService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async UpdateKitchen(@Body() body: UpdateKitchenDto, @Param('id') id: string): Promise<Kitchen> {
        return await this.kitchenService.saveUpdate(id, body);
    }

}
