import { PickType } from "@nestjs/swagger";
import { PermissionProfileDto } from "./permission-profile.dto";

export class GetHistoryOfPermissionProfileDto extends PickType(
  PermissionProfileDto,
  ["permissionProfileId"],
) {}
