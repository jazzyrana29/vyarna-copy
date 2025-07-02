import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class GetOperatorsForPermissionProfileDto {
  @ApiProperty({
    description: "Unique identifier for the permission profile",
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;
}
