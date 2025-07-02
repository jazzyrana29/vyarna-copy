import { PickType } from "@nestjs/swagger";
import { PermissionProfileManagedThroughMechanismPermitDto } from "./permission-profile-managed-through-mechanism-permit.dto";

export class DeletePermissionProfileManagedThroughMechanismPermitDto extends PickType(
  PermissionProfileManagedThroughMechanismPermitDto,
  ["mechanismPermitId", "permissionProfileId"] as const,
) {}
