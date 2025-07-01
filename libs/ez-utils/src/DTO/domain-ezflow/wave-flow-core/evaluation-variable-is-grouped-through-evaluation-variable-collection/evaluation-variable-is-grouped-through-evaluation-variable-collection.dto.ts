import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator";
import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
import { Type } from "class-transformer";

export class EvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto {
  @ApiProperty({
    description: "Unique ID for the evaluation variable collection grouping",
    example: "d9e7b62c-4f30-4d2d-bb1c-5f2e7b3e14ab",
  })
  @IsUUID()
  evaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string;

  @ApiProperty({
    description: "Reference to the evaluation variable collection",
    type: () => EvaluationVariableCollectionDto,
  })
  @Type(() => EvaluationVariableCollectionDto)
  evaluationVariableCollection: EvaluationVariableCollectionDto;

  @ApiProperty({
    description: "Reference to the evaluation variable",
    type: () => EvaluationVariableDto,
  })
  @Type(() => EvaluationVariableDto)
  evaluationVariable: EvaluationVariableDto;

  @ApiProperty({
    description: "Indicates whether the record is marked as deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the record",
    example: "admin_user",
  })
  @IsString()
  updatedBy: string;

  @ApiProperty({
    description: "Timestamp when the record was last updated",
    example: "2024-09-29T18:30:00.000Z",
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: "Timestamp when the record was created",
    example: "2024-09-01T10:00:00.000Z",
  })
  @IsDate()
  createdAt: Date;
}
