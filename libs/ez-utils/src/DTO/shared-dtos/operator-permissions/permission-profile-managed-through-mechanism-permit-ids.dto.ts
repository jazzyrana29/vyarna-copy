import { PickType } from "@nestjs/swagger";
import { PermissionProfileManagedThroughMechanismPermitDto } from "../../domain-multitenant/operator-permissions/permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.dto";

export class PermissionProfileManagedThroughMechanismPermitIdsDto extends PickType(
  PermissionProfileManagedThroughMechanismPermitDto,
  ["mechanismPermitId"] as const,
) {}
