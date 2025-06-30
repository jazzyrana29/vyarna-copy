import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PermissionProfileManagedThroughMechanismPermitDto } from "./permission-profile-managed-through-mechanism-permit.dto";

export class UpdatePermissionProfileManagedThroughMechanismPermitDto extends PartialType(
  PickType(PermissionProfileManagedThroughMechanismPermitDto, [
    "isPermitted",
  ] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the mechanism permit",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  mechanismPermitId: string;

  @ApiProperty({
    description: "Unique identifier for the permission profile",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  permissionProfileId: string;
}
