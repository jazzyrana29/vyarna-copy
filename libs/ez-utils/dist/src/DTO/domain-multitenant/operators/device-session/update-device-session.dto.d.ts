import { DeviceSessionDto } from "./device-session.dto";
declare const UpdateDeviceSessionDto_base: import("@nestjs/common").Type<Partial<Pick<DeviceSessionDto, "name" | "isDeleted" | "updatedBy" | "startTime" | "endTime" | "ipAddress" | "userAgent" | "lastUpdated" | "deviceId">>>;
export declare class UpdateDeviceSessionDto extends UpdateDeviceSessionDto_base {
    deviceSessionId: string;
}
export {};
