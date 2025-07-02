import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { EvaluationVariableDataTypeDto } from "../evaluation-variable-data-type/evaluation-variable-data-type.dto";

export class EvaluationOperatorDto {
  @ApiProperty({
    description: "Unique identifier of the evaluation operator",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  evaluationOperatorId: string;

  @ApiProperty({
    description: "Name of the evaluation operator",
    example: "Greater Than",
  })
  @IsString()
  name: string;

  @ApiProperty({ description: "Symbol of the operator", example: ">" })
  @IsString()
  symbol: string;

  @ApiProperty({
    description: "Description of the evaluation operator",
    example:
      "This operator is used to check if a value is greater than another.",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Choice type of the operator",
    example: "Numeric",
  })
  @IsString()
  choiceType: string;

  @ApiProperty({
    description: "Associated evaluation variable data types",
    type: [EvaluationVariableDataTypeDto],
  })
  @IsArray()
  evaluationVariableDataTypes: EvaluationVariableDataTypeDto[];

  @ApiProperty({
    description: "Flag indicating whether the evaluation operator is deleted",
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated the record",
    example: "user-123",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Date when the record was created",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Date when the record was last updated",
    example: "2024-10-01T12:00:00Z",
  })
  @IsDate()
  updatedAt: Date;
}
