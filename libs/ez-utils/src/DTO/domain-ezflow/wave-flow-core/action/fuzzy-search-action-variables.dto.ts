import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { IsOptional, IsString } from "class-validator";

export class FuzzySearchActionVariablesDto {
  @ApiPropertyOptional({
    description: "Exact match for Action ID (optional)",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsOptional()
  @IsString()
  actionId?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action ID (optional)",
    example: "123e4567",
  })
  @IsOptional()
  @IsString()
  fuzzyActionId?: string;

  @ApiPropertyOptional({
    description: "Exact match for Action Type (optional)",
    example: "SendEmail",
  })
  @IsOptional()
  @IsString()
  actionType?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action Type (optional)",
    example: "Email",
  })
  @IsOptional()
  @IsString()
  fuzzyActionType?: string;

  @ApiPropertyOptional({
    description: "Exact match for Action Name (optional)",
    example: "NotifyUser",
  })
  @IsOptional()
  @IsString()
  actionName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action Name (optional)",
    example: "Notify",
  })
  @IsOptional()
  @IsString()
  fuzzyActionName?: string;

  @ApiPropertyOptional({
    description: "Exact match for Action Variable Name (optional)",
    example: "emailAddress",
  })
  @IsOptional()
  @IsString()
  actionVariableName?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action Variable Name (optional)",
    example: "address",
  })
  @IsOptional()
  @IsString()
  fuzzyActionVariableName?: string;

  @ApiPropertyOptional({
    description: "Exact match for Action Variable Data Type (optional)",
    example: "Text",
  })
  @IsOptional()
  @IsString()
  actionVariableDataType?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action Variable Data Type (optional)",
    example: "Text",
  })
  @IsOptional()
  @IsString()
  fuzzyActionVariableDataType?: string;

  @ApiPropertyOptional({
    description: "Exact match for Action Variable ID (optional)",
    example: "987e6543-e21b-45d3-a456-426614174999",
  })
  @IsOptional()
  @IsString()
  actionVariableId?: string;

  @ApiPropertyOptional({
    description: "Fuzzy match for Action Variable ID (optional)",
    example: "987e6543",
  })
  @IsOptional()
  @IsString()
  fuzzyActionVariableId?: string;

  @ApiPropertyOptional({
    description:
      "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
    type: PaginationDto,
    nullable: true,
  })
  @IsOptional()
  @Type(() => PaginationDto)
  pagination?: PaginationDto | null;

  @ApiPropertyOptional({
    description: "Array of sorting instructions.",
    type: [SortOptionDto],
    default: [],
  })
  @IsOptional()
  @Type(() => SortOptionDto)
  sort?: SortOptionDto[] = [];
}
