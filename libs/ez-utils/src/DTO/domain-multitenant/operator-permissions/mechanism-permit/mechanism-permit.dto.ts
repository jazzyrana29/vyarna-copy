import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { PermissionProfileManagedThroughMechanismPermitDto } from "../permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.dto";

export class MechanismPermitDto {
  @ApiProperty({
    description: "Unique identifier for the mechanism permit",
    type: String,
    required: true,
  })
  @IsUUID()
  mechanismPermitId: string;

  @ApiProperty({
    description: "Name of the mechanism permit",
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the mechanism permit",
    type: String,
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Unique identifier of the associated system mechanism",
    type: String,
    required: true,
  })
  @IsUUID()
  systemMechanismId: string;

  @ApiProperty({
    description: "Indicates if the mechanism permit is marked as deleted",
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
    type: [PermissionProfileManagedThroughMechanismPermitDto],
  })
  @ValidateNested({ each: true })
  @Type(() => PermissionProfileManagedThroughMechanismPermitDto)
  @IsOptional()
  permissionProfileManagedThroughMechanismPermits?: PermissionProfileManagedThroughMechanismPermitDto[];
}
