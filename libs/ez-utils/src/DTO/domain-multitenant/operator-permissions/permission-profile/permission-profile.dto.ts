import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { OperatorPermissionProfileDto } from "../operator-permission-profile/operator-permission-profile.dto";
import { PermissionProfileManagedThroughMechanismPermitDto } from "../permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.dto";
import { PermissionProfileManagedThroughMechanismPermitIdsDto } from "../../../shared-dtos/operator-permissions/permission-profile-managed-through-mechanism-permit-ids.dto";
import { OperatorPermissionProfileIdsDto } from "../../../shared-dtos/operator-permissions/operator-permission-profile-ids.dto";

export class PermissionProfileDto {
  @ApiProperty({
    description: "Unique identifier for the permission profile",
    type: String,
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description:
      "Business unit identifier associated with the permission profile",
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  businessUnitId: string;

  @ApiProperty({
    description: "Name of the permission profile",
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the permission profile",
    type: String,
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Indicates if the permission profile is marked as deleted",
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty({
    description: "Identifier of the user who last updated the record",
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  updatedBy?: string;

  @ApiProperty({
    description: "The date when the record was created",
    type: Date,
  })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({
    description: "The date when the record was last updated",
    type: Date,
  })
  @IsOptional()
  updatedAt: Date;

  @ApiProperty({
    description:
      "List of permission profiles managed through mechanism permits",
    type: () => [PermissionProfileManagedThroughMechanismPermitIdsDto],
  })
  @ValidateNested({ each: true })
  @Type(() => PermissionProfileManagedThroughMechanismPermitIdsDto)
  @IsOptional()
  permissionProfileManagedThroughMechanismPermits?: Pick<
    PermissionProfileManagedThroughMechanismPermitDto,
    "mechanismPermitId"
  >[];

  @ApiProperty({
    description:
      "List of operator permission profiles associated with the permission profile",
    type: () => [OperatorPermissionProfileIdsDto],
  })
  @ValidateNested({ each: true })
  @Type(() => OperatorPermissionProfileIdsDto)
  @IsOptional()
  operatorPermissionProfiles?: Pick<
    OperatorPermissionProfileDto,
    "operatorId"
  >[];
}
