import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsOptional} from 'class-validator';

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
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
