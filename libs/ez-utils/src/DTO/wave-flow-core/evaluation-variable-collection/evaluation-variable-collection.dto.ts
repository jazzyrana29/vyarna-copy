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
import { EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto } from "../../shared-dtos/wave-flow-core/evaluation-variable-collections-are-presented-through-portfolios-id.dto";
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollectionIdDto } from "../../shared-dtos/wave-flow-core/evaluation-variable-is-grouped-through-evaluation-variable-collection-id.dto";

export class EvaluationVariableCollectionDto {
  @ApiProperty({
    description: "Unique identifier for the evaluation variable collection",
    required: false,
    example: "evc-1234",
  })
  @IsUUID()
  @IsOptional()
  evaluationVariableCollectionId: string;

  @ApiProperty({
    description: "Name of the evaluation variable collection",
    maxLength: 50,
    required: true,
    example: "Financial Metrics Collection",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the evaluation variable collection",
    maxLength: 500,
    required: true,
    example: "A collection of financial metrics used for company evaluation.",
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Indicates if the record is deleted",
    default: false,
    required: false,
    example: false,
  })
  @IsBoolean()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the record",
    nullable: true,
    example: "user-1234",
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the record was created",
    required: true,
    example: "2024-09-03T12:00:00Z",
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp when the record was last updated",
    required: true,
    example: "2024-09-03T12:30:00Z",
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: "Relations to portfolios",
    required: false,
    isArray: true,
    type: () => EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto)
  evaluationVariableCollectionsArePresentedThroughPortfolios?: EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto[];

  @ApiProperty({
    description: "Relations to grouped evaluation variables",
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
}
