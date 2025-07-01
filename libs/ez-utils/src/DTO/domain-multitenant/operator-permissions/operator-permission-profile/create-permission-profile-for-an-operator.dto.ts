import { PickType } from "@nestjs/swagger";
import { OperatorPermissionProfileDto } from "./operator-permission-profile.dto";

export class CreatePermissionProfileForAnOperatorDto extends PickType(
  OperatorPermissionProfileDto,
  ["operatorId", "permissionProfileId", "updatedBy"] as const,
) {}
