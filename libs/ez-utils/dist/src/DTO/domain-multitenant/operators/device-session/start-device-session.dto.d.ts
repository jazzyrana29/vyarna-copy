import { DeviceSessionDto } from "./device-session.dto";
declare const StartDeviceSessionDto_base: import("@nestjs/common").Type<Pick<DeviceSessionDto, "name" | "startTime" | "endTime" | "ipAddress" | "userAgent" | "lastUpdated" | "deviceId">>;
export declare class StartDeviceSessionDto extends StartDeviceSessionDto_base {
}
export {};
