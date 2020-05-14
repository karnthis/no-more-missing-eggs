import {PartialType} from '@nestjs/swagger';
import {KitchenDto} from './kitchen.dto';

export class UpdateKitchenDto extends PartialType(KitchenDto) {}
