import {ApiProperty} from '@nestjs/swagger';
import {Category} from '../../category/entities/category.entity';

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
    category: Category[];

}
