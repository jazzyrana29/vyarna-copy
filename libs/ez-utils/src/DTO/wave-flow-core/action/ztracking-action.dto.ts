import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingActionDto {
  @ApiProperty({
    description: "Unique identifier for the ztracking record",
    format: "uuid",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Links back to Action.actionId",
    format: "uuid",
  })
  @IsUUID()
  actionId: string;

  @ApiProperty({
    description: 'Action type at the time of snapshot (e.g. "SendEmail")',
    required: false,
  })
  @IsOptional()
  @IsString()
  actionType?: string;

  @ApiProperty({
    description: "Name of the action at the time of snapshot",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Description at the time of snapshot",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Logical delete flag at snapshot time",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "Who last updated the action at snapshot time",
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "Creation timestamp from original action at snapshot time",
    required: false,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: "Last update timestamp from original action at snapshot time",
    required: false,
  })
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @ApiProperty({
    description: "When this ztracking snapshot was recorded",
  })
  @IsDate()
  versionDate: Date;
}
