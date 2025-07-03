import { PermissionProfileDto } from "./permission-profile.dto";
declare const GetPermissionProfileDto_base: import("@nestjs/common").Type<Partial<Pick<PermissionProfileDto, "isDeleted" | "name">>>;
export declare class GetPermissionProfileDto extends GetPermissionProfileDto_base {
    permissionProfileId: string;
}
export {};
