import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { PermissionProfileDto } from "./permission-profile.dto";

export class GetPermissionProfileDto extends PartialType(
  PickType(PermissionProfileDto, ["name", "isDeleted"] as const),
) {
  @ApiProperty({
    description: "The unique identifier for the permission profile",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  permissionProfileId: string;
}
