import { PickType } from "@nestjs/swagger";
import { PermissionProfileManagedThroughMechanismPermitDto } from "./permission-profile-managed-through-mechanism-permit.dto";

export class CreatePermissionProfileManagedThroughMechanismPermitDto extends PickType(
  PermissionProfileManagedThroughMechanismPermitDto,
  ["mechanismPermitId", "permissionProfileId", "isPermitted"] as const
) {}
