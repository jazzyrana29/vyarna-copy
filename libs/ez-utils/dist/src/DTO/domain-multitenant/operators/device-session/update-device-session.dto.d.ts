import { DeviceSessionDto } from "./device-session.dto";
declare const UpdateDeviceSessionDto_base: import("@nestjs/common").Type<Partial<Pick<DeviceSessionDto, "isDeleted" | "updatedBy" | "name" | "startTime" | "endTime" | "ipAddress" | "userAgent" | "lastUpdated" | "deviceId">>>;
export declare class UpdateDeviceSessionDto extends UpdateDeviceSessionDto_base {
    deviceSessionId: string;
}
export {};
