import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsUUID,
  IsString,
  IsBoolean,
  IsDateString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { SortOptionDto } from "../../../shared-dtos/sort-option.dto";
import { PaginationDto } from "../../../shared-dtos/pagination.dto";

export class GetManyTasksDto {
  @ApiPropertyOptional({
    description: "Unique identifier for the node associated with the task",
    example: "b3f4c82a-12e3-4d6f-89d7-91a2bb7e46ed",
  })
  @IsOptional()
  @IsUUID()
  nodeId?: string;

  @ApiPropertyOptional({
    description: "Unique identifier for the wave associated with the task",
    example: "8a7f93f3-413e-4a7a-9275-5d84d61ce295",
  })
  @IsOptional()
  @IsUUID()
  waveId?: string;

  @ApiPropertyOptional({
    description: "Identifier of the user who last updated the task",
    example: "user123",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiPropertyOptional({
    description:
      "Human‐readable name of the status (matches TaskStatus.name). If set, filters by status name.",
    example: "InExecution",
  })
  @IsOptional()
  @IsString()
  taskStatusName?: string;

  @ApiPropertyOptional({
    description: "Indicates if the record is deleted",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiPropertyOptional({
    description: "Lower bound for the task start date (inclusive)",
    example: "2023-10-01T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  dateStartFrom?: string;

  @ApiPropertyOptional({
    description: "Upper bound for the task start date (inclusive)",
    example: "2023-10-02T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  dateStartTo?: string;

  @ApiPropertyOptional({
    description: "Lower bound for the task end date (inclusive)",
    example: "2023-10-01T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  dateEndFrom?: string;

  @ApiPropertyOptional({
    description: "Upper bound for the task end date (inclusive)",
    example: "2023-10-02T00:00:00Z",
  })
  @IsOptional()
  @IsDateString()
  dateEndTo?: string;

  @ApiPropertyOptional({
    description:
      "Pagination parameters. If omitted or null, no pagination is applied.",
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
