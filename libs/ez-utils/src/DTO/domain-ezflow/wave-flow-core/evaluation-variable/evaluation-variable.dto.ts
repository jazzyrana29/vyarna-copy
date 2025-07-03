import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection-id.dto";
import { EvaluationVariableDataTypeIdDto } from "../../../shared-dtos/wave-flow-core/evaluation-variable-data-type-id.dto";

class EvaluationValueOptionDto {
  @ApiProperty({ example: "AR", description: "Country or item ID" })
  @IsString()
  ID: string;

  @ApiProperty({ example: "Argentina", description: "Country or item name" })
  @IsString()
  name: string;
}

export class EvaluationVariableDto {
  @ApiProperty({
    description: "Unique ID for the evaluation variable",
    example: "efdb74b8-5f62-4992-8462-cad1f9b36e83",
  })
  @IsUUID()
  @IsOptional()
  evaluationVariableId: string;

  @ApiProperty({
    description: "Name of the evaluation variable",
    maxLength: 50,
    required: true,
    example: "Profit Margin Ratio",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the evaluation variable",
    maxLength: 500,
    required: true,
    example: "This variable is used to evaluate profit margins.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Indicates if the evaluation variable is deleted",
    default: false,
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Timestamp when the evaluation variable was created",
    required: true,
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the evaluation variable was last updated",
    required: true,
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: "Related grouped evaluation variable collections",
    required: false,
    isArray: true,
    type: () =>
      EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(
    () => EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto,
  )
  evaluationVariableIsGroupedThroughEvaluationVariableCollections?: EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto[];

  @ApiProperty({
    description: "DataType ID of the evaluation variable",
    required: true,
    type: String,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsUUID()
  evaluationVariableDataTypeId: string;

  @ApiProperty({
    description: "DataType of the evaluation variable",
    required: true,
    type: () => EvaluationVariableDataTypeIdDto,
  })
  @IsOptional()
  @Type(() => EvaluationVariableDataTypeIdDto)
  evaluationVariableDataType: EvaluationVariableDataTypeIdDto;

  @ApiProperty({
    description: "Optional array of selectable values or evaluation metadata",
    required: false,
    type: [EvaluationValueOptionDto],
    example: [
      { ID: "AR", name: "Argentina" },
      { ID: "CR", name: "Costa Rica" },
      { ID: "DR", name: "Dominican Republic" },
      { ID: "EE", name: "Estonia" },
      { ID: "NL", name: "Netherlands" },
      { ID: "PK", name: "Pakistan" },
      { ID: "ZM", name: "Zimbabwe" },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EvaluationValueOptionDto)
  evaluationValueOptions?: EvaluationValueOptionDto[];
}
