import {ApiProperty} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsOptional} from 'class-validator';

export class MembershipDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    role: string;

    @ApiProperty()
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
    lastUpdate: number;

}
