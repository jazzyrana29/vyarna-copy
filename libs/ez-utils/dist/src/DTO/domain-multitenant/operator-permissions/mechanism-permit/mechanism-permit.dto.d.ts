import { PermissionProfileManagedThroughMechanismPermitDto } from "../permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.dto";
export declare class MechanismPermitDto {
    mechanismPermitId: string;
    name: string;
    description: string;
    systemMechanismId: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    permissionProfileManagedThroughMechanismPermits?: PermissionProfileManagedThroughMechanismPermitDto[];
}
