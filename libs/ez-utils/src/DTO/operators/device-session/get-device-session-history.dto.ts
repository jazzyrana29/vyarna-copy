import { PickType } from "@nestjs/swagger";
import { DeviceSessionDto } from "./device-session.dto";

export class GetDeviceSessionHistoryDto extends PickType(DeviceSessionDto, [
  "name",
  "startTime",
  "endTime",
] as const) {}
