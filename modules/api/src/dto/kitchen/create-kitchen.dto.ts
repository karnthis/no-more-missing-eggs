import {ApiProperty} from '@nestjs/swagger';

export class CreateKitchenDto {

    @ApiProperty()
    ownerId: number;

    @ApiProperty()
    name: string;

}
