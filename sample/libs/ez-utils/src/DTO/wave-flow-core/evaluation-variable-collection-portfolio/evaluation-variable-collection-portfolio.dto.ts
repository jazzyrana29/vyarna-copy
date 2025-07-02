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

export class EvaluationVariableCollectionPortfolioDto {
  @ApiProperty({
    description:
      "Unique identifier for the evaluation variable collection portfolio",
    required: false,
    example: "evcp-1234",
  })
  @IsUUID()
  @IsOptional()
  evaluationVariableCollectionPortfolioId: string;

  @ApiProperty({
    description: "Unique identifier for the business unit",
    required: true,
    example: "bu-5678",
  })
  @IsUUID()
  businessUnitId: string;

  @ApiProperty({
    description: "Name of the evaluation variable collection portfolio",
    maxLength: 50,
    required: true,
    example: "Top Performance Metrics",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the evaluation variable collection portfolio",
    maxLength: 500,
    required: true,
    example: "A portfolio of metrics showing top performance indicators.",
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
    example: "user-5678",
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
    description:
      "Relations to evaluation variable collections presented through portfolios",
    required: false,
    isArray: true,
    type: () => EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto,
    example: [],
  })
  @IsOptional()
  @IsArray()
  @Type(() => EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto)
  evaluationVariableCollectionsArePresentedThroughPortfolios?: EvaluationVariableCollectionsArePresentedThroughPortfoliosIdDto[];
}
