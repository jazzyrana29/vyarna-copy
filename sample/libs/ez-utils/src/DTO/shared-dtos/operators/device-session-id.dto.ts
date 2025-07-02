import { PickType } from "@nestjs/swagger";
import { DeviceSessionDto } from "../../operators/device-session/device-session.dto";

export class DeviceSessionIdDto extends PickType(DeviceSessionDto, [
  "deviceSessionId",
] as const) {}
