import {ApiProperty} from '@nestjs/swagger';

export class ItemDto {

    @ApiProperty()
    count: number;

    @ApiProperty()
    expiration: number;

    @ApiProperty()
    added: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    category: string;

}
