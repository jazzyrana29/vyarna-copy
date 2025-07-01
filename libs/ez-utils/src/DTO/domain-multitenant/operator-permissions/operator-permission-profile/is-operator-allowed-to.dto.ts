import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class IsOperatorAllowedToDto {
  @ApiProperty({
    description: "Unique identifier for the permission profile",
    required: true,
  })
  @IsUUID()
  permissionProfileId: string;

  @ApiProperty({
    description: "Unique identifier for the mechanism permit",
    required: false,
  })
  @IsUUID()
  mechanismPermitId: string;
}
