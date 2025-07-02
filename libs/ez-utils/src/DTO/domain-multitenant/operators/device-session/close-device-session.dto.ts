import { PickType } from "@nestjs/swagger";
import { DeviceSessionDto } from "./device-session.dto";

export class CloseDeviceSessionDto extends PickType(DeviceSessionDto, [
  "deviceSessionId",
  "startTime",
  "endTime",
  "ipAddress",
  "userAgent",
  "lastUpdated",
  "updatedBy",
] as const) {}
