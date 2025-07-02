import { PickType } from "@nestjs/swagger";
import { PermissionProfileManagedThroughMechanismPermitDto } from "./permission-profile-managed-through-mechanism-permit.dto";

export class GetPermissionProfileManagedThroughMechanismPermitDto extends PickType(
  PermissionProfileManagedThroughMechanismPermitDto,
  ["mechanismPermitId", "permissionProfileId"],
) {}
