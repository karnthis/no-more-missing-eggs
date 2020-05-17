import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {KitchenService} from '../services/kitchen.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {MembershipDto} from '../../dto/membership/membership.dto';
import {Membership} from '../../membership/entities/membership.entity';
import {Kitchen} from '../entities/kitchen.entity';
import {UpdateKitchenDto} from '../../dto/kitchen/update-kitchen.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';

@Controller('kitchen')
export class KitchenController {
    constructor(
        private readonly kitchenService: KitchenService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async saveNew(
        @Request() req,
        @Body() savableKitchen: KitchenDto,
    ): Promise<Kitchen> {
        const membership: MembershipDto = {
            role: 'Owner',
        };
        return await this.kitchenService.saveNewKitchen({
            userId: req.user.sub.id,
            savableKitchen,
            membership,
        });
    }

    // TODO do we need this?
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return 'hello from kitchen';
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(
      @Param('id') id: number,
    ): Promise<Kitchen> {
        const foundKitchen = await this.kitchenService.findOneExpanded(id);
        if (foundKitchen) {
            return foundKitchen;
        } else {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                error: 'No Kitchen Found',
            }, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateKitchen(
      @Param('id') id: number,
      @Body() body: UpdateKitchenDto,
    ): Promise<Kitchen> {
        const kitchen = await this.kitchenService.saveUpdate(id, body);
        if (kitchen) {
            return kitchen;
        } else {
            throw new HttpException({
                statusCode: HttpStatus.NOT_FOUND,
                error: 'No Kitchen Found to Update',
            }, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteKitchen(
      @Param('id') id: number,
    ): Promise<DeleteResultsDto> {
        return await this.kitchenService.delete(id);
    }

}
