import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { Type } from "class-transformer";
import { EvaluationVariableCollectionPortfolioIdDto } from "../../shared-dtos/wave-flow-core/evaluation-variable-collection-portfolio-id.dto";
import { EvaluationVariableCollectionIdDto } from "../../shared-dtos/wave-flow-core/evaluation-variable-collection-id.dto";

export class EvaluationVariableCollectionsArePresentedThroughPortfoliosDto {
  @ApiProperty({
    description:
      "Unique identifier for the relation of evaluation variable collections through portfolios",
    required: false,
    example: "evcptp-1234",
  })
  @IsUUID()
  @IsOptional()
  evaluationVariableCollectionsArePresentedThroughPortfoliosId: string;

  @ApiProperty({
    description: "Portfolio of evaluation variable collections",
    required: true,
    type: () => EvaluationVariableCollectionPortfolioIdDto,
  })
  @Type(() => EvaluationVariableCollectionPortfolioIdDto)
  evaluationVariableCollectionPortfolio: EvaluationVariableCollectionPortfolioIdDto;

  @ApiProperty({
    description: "Evaluation variable collection",
    required: true,
    type: () => EvaluationVariableCollectionIdDto,
  })
  @Type(() => EvaluationVariableCollectionIdDto)
  evaluationVariableCollection: EvaluationVariableCollectionIdDto;

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
}
