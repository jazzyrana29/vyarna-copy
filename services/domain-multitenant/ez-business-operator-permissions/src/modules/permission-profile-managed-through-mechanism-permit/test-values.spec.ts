import { PermissionProfileManagedThroughMechanismPermit } from '../../entities/permission-profile-managed-through-mechanism-permit.entity';
import { ZtrackingPermissionProfileManagedThroughMechanismPermit } from '../../entities/ztracking-permission-profile-managed-through-mechanism-permit.entity';
import { MechanismPermit } from '../../entities/mechanism-permit.entity';
import { PermissionProfile } from '../../entities/permission-profile.entity';
import {
  CreatePermissionProfileManagedThroughMechanismPermitDto,
  UpdatePermissionProfileManagedThroughMechanismPermitDto,
} from 'ez-utils';

export const mockTraceId: string =
  'traceIdForMockCreatePermissionProfileManagedThroughMechanismPermit';
export const commonUseCreationDate: Date = new Date();
export const mockMechanismPermitId001: string =
  'uuidForMockMechanismPermitId001';
export const mockPermissionProfileId001: string =
  'uuidForMockPermissionProfileId001';
export const mockMechanismPermitId002: string =
  'uuidForMockMechanismPermitId002';
export const mockPermissionProfileId002: string =
  'uuidForMockPermissionProfileId002';
export const mockUser001: string =
  'userForMockPermissionProfileManagedThroughMechanismPermitCase001';
export const mockZtrackingVersion001: number = 1;

export const mockCreatePermissionProfileManagedThroughMechanismPermitDto: CreatePermissionProfileManagedThroughMechanismPermitDto =
  {
    mechanismPermitId: mockMechanismPermitId001,
    permissionProfileId: mockPermissionProfileId001,
    isPermitted: true,
    mechanismPermit: new MechanismPermit(),
    permissionProfile: new PermissionProfile(),
  };

export const mockUpdatePermissionProfileManagedThroughMechanismPermitDto: UpdatePermissionProfileManagedThroughMechanismPermitDto =
  {
    mechanismPermitId: mockMechanismPermitId001,
    permissionProfileId: mockPermissionProfileId001,
    isPermitted: false,
    mechanismPermit: new MechanismPermit(),
    permissionProfile: new PermissionProfile(),
  };

export const mockSavedPermissionProfileManagedThroughMechanismPermit: PermissionProfileManagedThroughMechanismPermit =
  {
    mechanismPermitId: mockMechanismPermitId001,
    permissionProfileId: mockPermissionProfileId001,
    isPermitted: true,
    mechanismPermit: new MechanismPermit(),
    permissionProfile: new PermissionProfile(),
  };

export const mockSavedZtrackingPermissionProfileManagedThroughMechanismPermit: ZtrackingPermissionProfileManagedThroughMechanismPermit =
  {
    ztrackingVersion: mockZtrackingVersion001,
    mechanismPermitId: mockMechanismPermitId001,
    permissionProfileId: mockPermissionProfileId001,
    isPermitted: true,
    versionDate: commonUseCreationDate,
  };

export const mockSavedPermissionProfileManagedThroughMechanismPermitCase002: PermissionProfileManagedThroughMechanismPermit =
  {
    mechanismPermitId: mockMechanismPermitId002,
    permissionProfileId: mockPermissionProfileId002,
    isPermitted: false,
    mechanismPermit: new MechanismPermit(),
    permissionProfile: new PermissionProfile(),
  };
