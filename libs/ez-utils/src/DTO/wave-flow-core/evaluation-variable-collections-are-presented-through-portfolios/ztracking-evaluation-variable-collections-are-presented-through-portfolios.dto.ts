import { ApiProperty } from "@nestjs/swagger";
import {
  IsUUID,
  IsOptional,
  IsDate,
  IsBoolean,
  IsString,
} from "class-validator";

export class ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfoliosDto {
  @ApiProperty({
    description: "Unique version identifier for the ztracking",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the relation",
    type: String,
    required: true,
  })
  @IsUUID()
  evaluationVariableCollectionsArePresentedThroughPortfoliosId: string;

  @ApiProperty({
    description: "Portfolio of evaluation variable collections ID",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  evaluationVariableCollectionPortfolioId?: string;

  @ApiProperty({
    description: "Evaluation variable collection ID",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  evaluationVariableCollectionId?: string;

  @ApiProperty({
    description: "Indicates whether the record is deleted",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Identifier of the user who updated the record",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description: "Timestamp when the record was created",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Timestamp when the record was last updated",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({
    description: "The version date of the tracking",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
