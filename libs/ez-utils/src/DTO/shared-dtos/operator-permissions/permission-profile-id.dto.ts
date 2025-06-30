import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PermissionProfileIdDto {
  @ApiProperty({
    description: "Unique identifier for the permission profile",
    type: String,
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;
}
