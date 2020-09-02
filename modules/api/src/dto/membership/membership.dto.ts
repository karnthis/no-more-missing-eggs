import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlpha, IsDate, IsJSON, IsNotEmpty, IsOptional} from 'class-validator';
import {UserDto} from '../user/user.dto';

export class MembershipDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    role: string;

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
