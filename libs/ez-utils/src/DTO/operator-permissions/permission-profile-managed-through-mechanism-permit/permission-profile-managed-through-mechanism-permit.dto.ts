import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { MechanismPermitIdDto } from "../../shared-dtos/operator-permissions/mechanism-permit-id.dto";
import { PermissionProfileIdDto } from "../../shared-dtos/operator-permissions/permission-profile-id.dto";

export class PermissionProfileManagedThroughMechanismPermitDto {
  @ApiProperty({
    description: "Unique identifier for the mechanism permit",
    type: String,
    required: true,
  })
  @IsUUID()
  mechanismPermitId: string;

  @ApiProperty({
    description: "Unique identifier for the permission profile",
    type: String,
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description: "Mechanism permit related to the profile",
    type: () => MechanismPermitIdDto,
  })
  @ValidateNested()
  @Type(() => MechanismPermitIdDto)
  mechanismPermit: MechanismPermitIdDto;

  @ApiProperty({
    description: "Permission profile associated with the mechanism permit",
    type: () => PermissionProfileIdDto,
  })
  @ValidateNested()
  @Type(() => PermissionProfileIdDto)
  permissionProfile: PermissionProfileIdDto;

  @ApiProperty({
    description:
      "Indicates if the permission profile is permitted through the mechanism permit",
    default: false,
  })
  @IsBoolean()
  isPermitted: boolean;
}
