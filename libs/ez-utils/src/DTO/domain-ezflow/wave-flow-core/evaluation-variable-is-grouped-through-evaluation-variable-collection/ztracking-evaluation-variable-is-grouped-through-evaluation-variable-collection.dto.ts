import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { EvaluationVariableDto } from "../evaluation-variable/evaluation-variable.dto";
import { EvaluationVariableCollectionDto } from "../evaluation-variable-collection/evaluation-variable-collection.dto";
import { Type } from "class-transformer";

export class ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollectionDto {
  @ApiProperty({
    description: "UUID for tracking version of the grouped evaluation variable",
    example: "6f5b6e84-6d8b-4fa2-8214-243578ed97a1",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "ID of the Evaluation Variable Grouping",
    example: "d8b1e5bc-1a65-485f-b8f1-8f02eb6d885f",
  })
  @IsUUID()
  evaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string;

  @ApiProperty({
    description: "Reference to the Evaluation Variable Collection",
    type: () => EvaluationVariableCollectionDto,
  })
  @Type(() => EvaluationVariableCollectionDto)
  @IsOptional()
  evaluationVariableCollection?: EvaluationVariableCollectionDto;

  @ApiProperty({
    description: "Reference to the Evaluation Variable",
    type: () => EvaluationVariableDto,
  })
  @IsOptional()
  evaluationVariable?: EvaluationVariableDto;

  @ApiProperty({
    description: "Indicates whether the record is marked as deleted",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({
    description: "User who last updated the record",
    example: "user123",
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "Version date of the evaluation variable grouping",
    example: "2024-10-04T10:15:00.000Z",
  })
  @IsDate()
  versionDate: Date;
}
