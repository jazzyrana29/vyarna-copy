import { ApiProperty, PickType, PartialType } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { DeviceSessionDto } from "./device-session.dto";

export class GetDeviceSessionDto extends PartialType(
  PickType(DeviceSessionDto, ["name", "isDeleted"] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the device session",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  deviceSessionId: string;
}
