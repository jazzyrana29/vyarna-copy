import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PermissionProfileDto } from "./permission-profile.dto";

export class UpdatePermissionProfileDto extends PartialType(
  PickType(PermissionProfileDto, [
    "businessUnitId",
    "name",
    "description",
    "isDeleted",
    "updatedBy",
    "permissionProfileManagedThroughMechanismPermits",
    "operatorPermissionProfiles",
  ] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the permission profile",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  permissionProfileId: string;
}
