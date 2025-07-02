import { PickType } from "@nestjs/swagger";
import { PermissionProfileDto } from "./permission-profile.dto";

export class DeletePermissionProfileEntityDto extends PickType(
  PermissionProfileDto,
  ["permissionProfileId"],
) {}
