import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class SearchOperatorSessionsDto {
  @ApiProperty({
    description: "Operator ID to search sessions for",
    required: false,
  })
  @IsString()
  @IsOptional()
  operatorId?: string;

  @ApiProperty({
    description: "Start date for the session search range",
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    description: "End date for the session search range",
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;
}
