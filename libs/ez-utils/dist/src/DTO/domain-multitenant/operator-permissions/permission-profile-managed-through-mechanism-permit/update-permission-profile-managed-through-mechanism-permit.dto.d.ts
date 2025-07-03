import { PermissionProfileManagedThroughMechanismPermitDto } from "./permission-profile-managed-through-mechanism-permit.dto";
declare const UpdatePermissionProfileManagedThroughMechanismPermitDto_base: import("@nestjs/common").Type<Partial<Pick<PermissionProfileManagedThroughMechanismPermitDto, "isPermitted">>>;
export declare class UpdatePermissionProfileManagedThroughMechanismPermitDto extends UpdatePermissionProfileManagedThroughMechanismPermitDto_base {
    mechanismPermitId: string;
    permissionProfileId: string;
}
export {};
