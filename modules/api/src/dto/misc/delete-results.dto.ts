import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class DeleteResultsDto {

  @ApiProperty()
  raw: [];

  @ApiPropertyOptional()
  affected?: number;

}
