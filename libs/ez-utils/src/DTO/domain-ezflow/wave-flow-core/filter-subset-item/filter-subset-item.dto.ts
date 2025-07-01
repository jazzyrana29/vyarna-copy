import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { FilterSubsetDto } from "../filter-subset/filter-subset.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
import { EvaluationOperatorDto } from "../evaluation-operator/evaluation-operator.dto";
import { Type } from "class-transformer";

export class FilterSubsetItemDto extends IntersectionType(
  PickType(EvaluationVariableDto, ["evaluationVariableId"] as const),
  PickType(EvaluationOperatorDto, ["evaluationOperatorId"] as const),
) {
  @ApiProperty({
    description: "Unique identifier of the filter subset item",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterSubsetItemId: string;

  @ApiProperty({
    description: "Unique identifier of the filter subset",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  filterSubsetId: string;

  @ApiProperty({
    description: "Evaluation value for the filter subset item",
    example: "100",
  })
  @IsString()
  evaluationValue: string;

  @ApiProperty({
    description: "Associated filter subset",
    type: () => FilterSubsetDto,
  })
  @Type(() => FilterSubsetDto)
  filterSubset: FilterSubsetDto;

  @ApiProperty({
    description: "Associated evaluation variable",
    type: () => EvaluationVariableDto,
  })
  @Type(() => EvaluationVariableDto)
  evaluationVariable: EvaluationVariableDto;

  @ApiProperty({
    description: "Associated evaluation operator",
    type: () => EvaluationOperatorDto,
  })
  @Type(() => EvaluationOperatorDto)
  evaluationOperator: EvaluationOperatorDto;

  @ApiProperty({
    description: "Indicates whether the filter subset item is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the filter subset item",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the filter subset item was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the filter subset item was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
