import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsUUID,
} from "class-validator";

export class ZtrackingOperatorPermissionProfileDto {
  @ApiProperty({
    description: "Unique version number for the ztracking record",
    type: Number,
    required: true,
  })
  @IsNumber()
  ztrackingVersion: number;

  @ApiProperty({
    description: "Operator ID associated with the permission profile",
    type: String,
    required: true,
  })
  @IsUUID()
  operatorId: string;

  @ApiProperty({
    description: "Permission profile ID associated with the operator",
    type: String,
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description:
      "Indicates if the operator permission profile is marked as deleted",
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
    description:
      "The version date of the ztracking operator permission profile",
    type: Date,
    required: true,
  })
  @IsDate()
  versionDate: Date;
}
