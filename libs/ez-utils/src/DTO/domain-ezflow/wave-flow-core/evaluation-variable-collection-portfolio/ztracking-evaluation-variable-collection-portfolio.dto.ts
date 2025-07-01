import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
  IsUUID,
} from "class-validator";

export class ZtrackingEvaluationVariableCollectionPortfolioDto {
  @ApiProperty({
    description: "Unique version identifier for the ztracking portfolio",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description:
      "Unique identifier for the evaluation variable collection portfolio",
    type: String,
    required: true,
  })
  @IsUUID()
  evaluationVariableCollectionPortfolioId: string;

  @ApiProperty({
    description: "Unique identifier for the business unit",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  businessUnitId?: string;

  @ApiProperty({
    description: "Name of the evaluation variable collection portfolio",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Description of the evaluation variable collection portfolio",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Identifier of the user who updated the record",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiProperty({
    description:
      "Creation time of the evaluation variable collection portfolio",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description:
      "Last update time of the evaluation variable collection portfolio",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({
    description: "Indicates whether the portfolio is deleted",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "The version date of the portfolio",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
