import { PickType } from "@nestjs/swagger";
import { PermissionProfileDto } from "./permission-profile.dto";

export class PopulatePermissionProfileDto extends PickType(
  PermissionProfileDto,
  [
    "permissionProfileId",
    "operatorPermissionProfiles",
    "permissionProfileManagedThroughMechanismPermits",
  ] as const
) {}
