import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { EvaluationOperatorIdDto } from "../../shared-dtos/wave-flow-core/evaluation-operator-id.dto";
import { EvaluationVariableIdDto } from "../../shared-dtos/wave-flow-core/evaluation-variable-id.dto";

export class EvaluationVariableDataTypeDto {
  @ApiProperty({
    description: "Unique identifier of the evaluation variable data type",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  evaluationVariableDataTypeId: string;

  @ApiProperty({
    description: "Name of the evaluation variable data type",
    example: "Numeric",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the evaluation variable data type",
    example: "This data type is used for numeric evaluations",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description:
      "List of evaluation variable IDs associated with this data type",
    type: [EvaluationVariableIdDto],
    required: true,
  })
  @IsArray()
  @Type(() => EvaluationVariableIdDto)
  evaluationVariables: EvaluationVariableIdDto[];

  @ApiProperty({
    description:
      "List of evaluation operator IDs associated with this data type",
    type: [EvaluationOperatorIdDto],
    required: true,
  })
  @IsArray()
  @Type(() => EvaluationOperatorIdDto)
  evaluationOperators: EvaluationOperatorIdDto[];

  @ApiProperty({
    description:
      "Indicates whether the evaluation variable data type is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "ID of the user who last updated the data type",
    example: "user-uuid",
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the evaluation variable data type was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the evaluation variable data type was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
