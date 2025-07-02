import { PickType } from "@nestjs/swagger";
import { DeviceSessionDto } from "./device-session.dto";

export class StartDeviceSessionDto extends PickType(DeviceSessionDto, [
  "startTime",
  "endTime",
  "ipAddress",
  "userAgent",
  "lastUpdated",
  "name",
  "deviceId",
] as const) {}
