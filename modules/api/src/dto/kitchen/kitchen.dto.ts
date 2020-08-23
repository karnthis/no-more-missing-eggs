import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class KitchenDto {

    @ApiProperty()
    @IsNumber()
    ownerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    metadata: {};

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsAlpha()
    // status: string;
    //
    // @ApiProperty()
    // @IsNotEmpty()
    // @IsDate()
    // lastUpdate: Date;

}
