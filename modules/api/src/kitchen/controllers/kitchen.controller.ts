import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {KitchenService} from '../services/kitchen.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {MembershipDto} from '../../dto/membership/membership.dto';
import {Kitchen} from '../entities/kitchen.entity';
import {UpdateKitchenDto} from '../../dto/kitchen/update-kitchen.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';

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
            metadata: {},
            status: null,
            lastUpdate: null,
        };
        return await this.kitchenService.saveNewKitchen({
            userId: req.user.sub,
            savableKitchen,
            membership,
        });
    }

    // TODO do we need this?
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllOfMine(
      @Request() req,
    ) {
        return this.kitchenService.findMine(req.user.sub);
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
    ): Promise<any> {
        return await this.kitchenService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/m/:id')
    async saveNewKitchenMembership(
      @Request() req,
      @Param() id: any,
    ): Promise<Kitchen> {
        const membership: MembershipDto = {
            role: 'User',
            metadata: {},
            status: null,
            lastUpdate: null,
        };

        return await this.kitchenService.saveNewKitchenMembership({
            userId: req.user.sub,
            kitchenId: id,
            membership,
        });
    }

}
