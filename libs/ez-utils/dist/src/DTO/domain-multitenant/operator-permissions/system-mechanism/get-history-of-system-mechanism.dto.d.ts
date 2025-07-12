import { SystemMechanismDto } from "./system-mechanism.dto";
declare const GetHistoryOfSystemMechanismDto_base: import("@nestjs/common").Type<Partial<Pick<SystemMechanismDto, "name" | "isDeleted">>>;
export declare class GetHistoryOfSystemMechanismDto extends GetHistoryOfSystemMechanismDto_base {
    systemMechanismId: string;
}
export {};
