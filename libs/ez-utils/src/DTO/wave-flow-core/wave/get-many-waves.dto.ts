import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { SortOptionDto } from "../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../shared-dtos/pagination.dto";
import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

export class GetManyWavesDto {
  @ApiPropertyOptional({
    description:
      "Status of the wave. Allowed values: InExecution, FailedWithError, Completed.",
    example: "InExecution",
  })
  @IsOptional()
  @IsString()
  waveStatus?: "InExecution" | "FailedWithError" | "Completed";

  @ApiPropertyOptional({
    description: "Execution flow ID associated with the wave",
    example: "a7c5e254-c96f-4803-b749-9db0f9a94293",
  })
  @IsOptional()
  @IsUUID()
  executionFlowId?: string;

  @ApiPropertyOptional({
    description: "Wave type ID associated with the wave",
    example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
  })
  @IsOptional()
  @IsUUID()
  waveTypeId?: string;

  @ApiPropertyOptional({
    description: "Indicates if the record is deleted",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiPropertyOptional({
    description: "Identifier of the user who last updated the wave",
    example: "user123",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiPropertyOptional({
    description: "Lower bound for the execution start date (inclusive)",
    example: "2023-10-01T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  executionStartDateFrom?: string;

  @ApiPropertyOptional({
    description: "Upper bound for the execution start date (inclusive)",
    example: "2023-10-02T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  executionStartDateTo?: string;

  @ApiPropertyOptional({
    description: "Lower bound for the execution end date (inclusive)",
    example: "2023-10-01T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  executionEndDateFrom?: string;

  @ApiPropertyOptional({
    description: "Upper bound for the execution end date (inclusive)",
    example: "2023-10-02T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  executionEndDateTo?: string;

  @ApiPropertyOptional({
    description:
      "If present, defines pagination parameters. If omitted or null, no pagination is applied.",
    type: PaginationDto,
    nullable: true,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto | null;

  @ApiPropertyOptional({
    description: "Array of sorting instructions.",
    type: [SortOptionDto],
    default: [],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortOptionDto)
  sort?: SortOptionDto[] = [];
}
