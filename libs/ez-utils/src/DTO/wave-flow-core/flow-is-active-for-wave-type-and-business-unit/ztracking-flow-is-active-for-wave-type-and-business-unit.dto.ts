import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsOptional, IsUUID } from "class-validator";

export class ZtrackingFlowIsActiveForWaveTypeAndBusinessUnitDto {
  @ApiProperty({
    description:
      "The unique identifier of the Ztracking flow active status version",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "The flow ID associated with this active status",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  flowId?: string;

  @ApiProperty({
    description: "The wave type ID associated with this active status",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  waveTypeId?: string;

  @ApiProperty({
    description: "The business unit ID associated with this active status",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  businessUnitId?: string;

  @ApiProperty({
    description:
      "Indicates if the Ztracking flow active status is marked as deleted",
    type: Boolean,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    description: "The user who last updated this active status",
    type: String,
    format: "uuid",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the active status version was created",
    type: Date,
  })
  @IsDate()
  versionDate: Date;
}
