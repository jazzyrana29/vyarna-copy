import { MechanismPermitIdDto } from "../../../shared-dtos/operator-permissions/mechanism-permit-id.dto";
import { PermissionProfileIdDto } from "../../../shared-dtos/operator-permissions/permission-profile-id.dto";
export declare class PermissionProfileManagedThroughMechanismPermitDto {
    mechanismPermitId: string;
    permissionProfileId: string;
    mechanismPermit: MechanismPermitIdDto;
    permissionProfile: PermissionProfileIdDto;
    isPermitted: boolean;
}
