import {ApiProperty} from '@nestjs/swagger';
import {Category} from '../../category/entities/category.entity';
import {Column} from 'typeorm';

export class ItemDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    barcode: number;

    @ApiProperty()
    count: number;

    @ApiProperty()
    expiration: number;

    @ApiProperty()
    added: number;

    @Column()
    isDelete: boolean;

    @ApiProperty()
    category: Category[];

}
