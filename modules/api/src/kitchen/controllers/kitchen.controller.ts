import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {KitchenService} from '../services/kitchen.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {MembershipDto} from '../../dto/membership/membership.dto';
import {Kitchen} from '../entities/kitchen.entity';
import {UpdateKitchenDto} from '../../dto/kitchen/inbound/update-kitchen.dto';
import {KitchenDto} from '../../dto/kitchen/kitchen.dto';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {ExpandedKitchenDto} from '../../dto/kitchen/outbound/expandedKitchen.dto';

@Controller('kitchen')
@HttpErrors()
@ApiTags('Kitchen')
export class KitchenController {
    constructor(
        private readonly kitchenService: KitchenService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiCreatedResponse({ description: 'The Kitchen has been successfully created.', type: KitchenDto})
    async saveNew(
        @Request() req,
        @Body() savableKitchen: KitchenDto,
    ): Promise<ExpandedKitchenDto> {
        const membership: MembershipDto = {
            role: 'Owner',
            metadata: {},
            status: null,
            lastUpdated: null,
        };
        return await this.kitchenService.saveNewKitchen({
            userId: req.user.sub,
            savableKitchen,
            membership,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOkResponse({ type: [ExpandedKitchenDto] })
    getAllOfMine(
      @Request() req,
    ): Promise<ExpandedKitchenDto[]> {
        return this.kitchenService.findMine(req.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({ type: ExpandedKitchenDto })
    async getOne(
      @Param('id') id: number,
    ): Promise<ExpandedKitchenDto> {
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
    @Get('/f/:id')
    @ApiOkResponse({ type: Kitchen })
    async getFullOne(
        @Param('id') id: number,
    ): Promise<any|Kitchen> {
        const foundKitchen = await this.kitchenService.findOneComplete(id);
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
    @Get('/car/:id')
    @ApiOkResponse({ type: Kitchen })
    async getCartonOne(
        @Param('id') id: number,
    ): Promise<Kitchen> {
        const foundKitchen = await this.kitchenService.findOneWithCartons(id);
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
    @Get('/cat/:id')
    @ApiOkResponse({ type: Kitchen })
    async getCategoryOne(
        @Param('id') id: number,
    ): Promise<Kitchen> {
        const foundKitchen = await this.kitchenService.findOneWithCategories(id);
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
    @Get('/meta/:id')
    @ApiOkResponse({ description: 'Kitchen metadata refreshed', type: KitchenDto })
    async getMetaOne(
        @Param('id') id: number,
    ): Promise<KitchenDto> {
        const foundKitchen = await this.kitchenService.findOneMeta(id);
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
    @ApiOkResponse({ type: Kitchen })
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
    @ApiOkResponse({ type: KitchenDto })
    async deleteKitchen(
      @Param('id') id: number,
    ): Promise<KitchenDto> {
        return await this.kitchenService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/mem/:id')
    @ApiCreatedResponse({ description: 'The Membership has been successfully added.', type: ExpandedKitchenDto})
    async saveNewKitchenMembership(
      @Request() req,
      @Param() id: any,
    ): Promise<ExpandedKitchenDto> {
        const membership: MembershipDto = {
            role: 'User',
            metadata: {},
            status: null,
            lastUpdated: null,
        };
        return await this.kitchenService.saveNewKitchenMembership({
            userId: req.user.sub,
            kitchenId: id,
            membership,
        });
    }

}
