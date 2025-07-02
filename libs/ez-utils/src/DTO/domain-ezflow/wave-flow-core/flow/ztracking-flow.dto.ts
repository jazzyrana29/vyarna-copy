import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingFlowDto {
  @ApiProperty({
    description: "The unique identifier of the Ztracking flow version",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "The flow ID associated with this Ztracking flow",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  flowId: string;

  @ApiProperty({
    description: "The name of the Ztracking flow",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "A description of the Ztracking flow",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The wave type ID associated with this Ztracking flow",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  waveTypeId?: string;

  @ApiProperty({
    description: "Business Unit ID for this Ztracking flow",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  businessUnitId?: string;

  @ApiProperty({
    description: "Indicates if the Ztracking flow is marked as deleted",
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Indicates if the Ztracking flow is published",
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @ApiProperty({
    description: "The user who last updated this Ztracking flow",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the Ztracking flow version was created",
    type: Date,
  })
  @IsDate()
  versionDate: Date;
}
