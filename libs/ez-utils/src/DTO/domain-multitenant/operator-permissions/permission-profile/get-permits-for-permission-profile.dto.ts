import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetPermitsForPermissionProfileDto {
  @ApiProperty({
    description: "Unique identifier for the permission profile",
    required: false,
  })
  @IsUUID()
  permissionProfileId: string;
}
