import { PickType } from "@nestjs/swagger";
import { PermissionProfileManagedThroughMechanismPermitDto } from "./permission-profile-managed-through-mechanism-permit.dto";

export class GetHistoryOfPermissionProfileManageThroughMechanismPermitDto extends PickType(
  PermissionProfileManagedThroughMechanismPermitDto,
  ["permissionProfileId", "mechanismPermitId"],
) {}
