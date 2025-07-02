import { PickType } from "@nestjs/swagger";
import { DeviceSessionDto } from "./device-session.dto";

export class CreateDeviceSessionDto extends PickType(DeviceSessionDto, [
  "ipAddress",
  "userAgent",
  "name",
  "deviceId",
  "updatedBy",
] as const) {}
