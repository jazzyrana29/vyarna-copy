import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsUUID, IsString } from "class-validator";

export class ZtrackingEvaluationVariableDto {
  @ApiProperty({
    description: "Unique identifier for the ztracking evaluation variable",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Unique identifier for the evaluation variable",
    type: String,
    required: true,
  })
  @IsUUID()
  evaluationVariableId: string;

  @ApiProperty({
    description: "Name of the evaluation variable",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Description of the evaluation variable",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Data type unique identifier for the evaluation variable",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsUUID()
  evaluationVariableDataTypeId?: string;

  @ApiProperty({
    description: "Creation time of the evaluation variable",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Last update time of the evaluation variable",
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({
    description: "Indicates whether the evaluation variable is deleted",
    type: Boolean,
    required: false,
  })
  @IsOptional()
  isDeleted?: boolean;

  @ApiProperty({
    description: "The version date of the evaluation variable",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
