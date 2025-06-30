import { PickType } from "@nestjs/swagger";
import { OperatorPermissionProfileDto } from "./operator-permission-profile.dto";

export class RemovePermissionProfileForAnOperatorDto extends PickType(
  OperatorPermissionProfileDto,
  ["permissionProfileId", "operatorId"],
) {}
