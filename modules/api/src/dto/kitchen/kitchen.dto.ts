import {ApiProperty} from '@nestjs/swagger';

export class KitchenDto {

    @ApiProperty()
    ownerId: number;

    @ApiProperty()
    name: string;

}
