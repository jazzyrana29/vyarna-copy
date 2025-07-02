import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsUUID,
} from "class-validator";

export class ZtrackingPermissionProfileManagedThroughMechanismPermitDto {
  @ApiProperty({
    description: "Unique version number for the ztracking record",
    type: Number,
    required: true,
  })
  @IsNumber()
  ztrackingVersion: number;

  @ApiProperty({
    description: "Mechanism permit identifier",
    type: String,
    required: true,
  })
  @IsUUID()
  mechanismPermitId: string;

  @ApiProperty({
    description: "Permission profile identifier",
    type: String,
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description:
      "Indicates if the permission profile is permitted through the mechanism permit",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isPermitted: boolean;

  @ApiProperty({
    description:
      "The version date of the ztracking permission profile managed through mechanism permit",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
