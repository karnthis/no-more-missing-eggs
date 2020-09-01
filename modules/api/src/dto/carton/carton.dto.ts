import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsOptional} from 'class-validator';

export class CartonDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    metadata: {};

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    status: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    lastUpdated: Date;

}
