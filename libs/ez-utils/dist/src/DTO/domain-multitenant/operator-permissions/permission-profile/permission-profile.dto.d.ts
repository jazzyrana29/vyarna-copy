import { OperatorPermissionProfileDto } from "../operator-permission-profile/operator-permission-profile.dto";
import { PermissionProfileManagedThroughMechanismPermitDto } from "../permission-profile-managed-through-mechanism-permit/permission-profile-managed-through-mechanism-permit.dto";
export declare class PermissionProfileDto {
    permissionProfileId: string;
    businessUnitId: string;
    name: string;
    description: string;
    isDeleted: boolean;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    permissionProfileManagedThroughMechanismPermits?: Pick<PermissionProfileManagedThroughMechanismPermitDto, "mechanismPermitId">[];
    operatorPermissionProfiles?: Pick<OperatorPermissionProfileDto, "operatorId">[];
}
