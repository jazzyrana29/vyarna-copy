import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @ApiPropertyOptional({
    description: "Page number (start from 1).",
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of results per page.",
    default: 25,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number = 25;
}
