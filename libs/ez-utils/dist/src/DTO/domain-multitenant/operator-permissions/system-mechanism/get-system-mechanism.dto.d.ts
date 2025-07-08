import { SystemMechanismDto } from "./system-mechanism.dto";
declare const GetSystemMechanismDto_base: import("@nestjs/common").Type<Partial<Pick<SystemMechanismDto, "isDeleted" | "name">>>;
export declare class GetSystemMechanismDto extends GetSystemMechanismDto_base {
    systemMechanismId: string;
}
export {};
