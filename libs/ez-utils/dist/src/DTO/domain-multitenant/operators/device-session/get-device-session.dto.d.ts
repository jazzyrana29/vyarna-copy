import { DeviceSessionDto } from "./device-session.dto";
declare const GetDeviceSessionDto_base: import("@nestjs/common").Type<Partial<Pick<DeviceSessionDto, "name" | "isDeleted">>>;
export declare class GetDeviceSessionDto extends GetDeviceSessionDto_base {
    deviceSessionId: string;
}
export {};
