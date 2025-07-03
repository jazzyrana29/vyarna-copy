import { PickType } from "@nestjs/swagger";
import { OperatorPermissionProfileDto } from "../../domain-multitenant/operator-permissions/operator-permission-profile/operator-permission-profile.dto";

export class OperatorPermissionProfileIdsDto extends PickType(
  OperatorPermissionProfileDto,
  ["operatorId"] as const,
) {}
