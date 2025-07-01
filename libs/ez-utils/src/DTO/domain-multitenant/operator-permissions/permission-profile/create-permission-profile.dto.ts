import { PickType } from "@nestjs/swagger";
import { PermissionProfileDto } from "./permission-profile.dto";

export class CreatePermissionProfileDto extends PickType(PermissionProfileDto, [
  "businessUnitId",
  "name",
  "description",
  "updatedBy",
] as const) {}
