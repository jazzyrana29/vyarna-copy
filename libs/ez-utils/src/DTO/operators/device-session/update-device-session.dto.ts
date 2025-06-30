import { PickType, PartialType, ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { DeviceSessionDto } from "./device-session.dto";

export class UpdateDeviceSessionDto extends PartialType(
  PickType(DeviceSessionDto, [
    "startTime",
    "endTime",
    "ipAddress",
    "userAgent",
    "lastUpdated",
    "name",
    "deviceId",
    "isDeleted",
    "updatedBy",
  ] as const)
) {
  @ApiProperty({
    description: "Unique identifier for the device session",
    type: String,
    format: "uuid",
  })
  @IsUUID()
  deviceSessionId: string;
}
