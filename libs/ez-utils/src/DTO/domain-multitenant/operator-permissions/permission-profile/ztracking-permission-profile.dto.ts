import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class ZtrackingPermissionProfileDto {
  @ApiProperty({
    description: "Unique identifier for the ztracking version",
    type: String,
    required: true,
  })
  @IsUUID()
  ztrackingVersion: string;

  @ApiProperty({
    description: "Permission profile identifier",
    type: String,
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description: "Business unit identifier",
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  businessUnitId: string;

  @ApiProperty({
    description: "Name of the permission profile",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Description of the permission profile",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: "Indicates if the permission profile is marked as deleted",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty({
    description: "User who last updated the record",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the record was created",
    type: Date,
    required: false,
  })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({
    description: "Version date of the ztracking permission profile",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
