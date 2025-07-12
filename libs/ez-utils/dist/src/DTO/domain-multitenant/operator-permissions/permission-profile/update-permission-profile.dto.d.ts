import { PermissionProfileDto } from "./permission-profile.dto";
declare const UpdatePermissionProfileDto_base: import("@nestjs/common").Type<Partial<Pick<PermissionProfileDto, "name" | "description" | "businessUnitId" | "isDeleted" | "updatedBy" | "permissionProfileManagedThroughMechanismPermits" | "operatorPermissionProfiles">>>;
export declare class UpdatePermissionProfileDto extends UpdatePermissionProfileDto_base {
    permissionProfileId: string;
}
export {};
