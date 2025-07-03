import { PermissionProfileDto } from "./permission-profile.dto";
declare const UpdatePermissionProfileDto_base: import("@nestjs/common").Type<Partial<Pick<PermissionProfileDto, "isDeleted" | "updatedBy" | "name" | "description" | "businessUnitId" | "permissionProfileManagedThroughMechanismPermits" | "operatorPermissionProfiles">>>;
export declare class UpdatePermissionProfileDto extends UpdatePermissionProfileDto_base {
    permissionProfileId: string;
}
export {};
