import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { MechanismPermit } from './mechanism-permit.entity';
import { PermissionProfile } from './permission-profile.entity';

@Entity('permission_profile_managed_through_mechanism_permits', {
  schema: process.env.TIDB_DATABASE,
})
export class PermissionProfileManagedThroughMechanismPermit {
  @PrimaryColumn('uuid')
  mechanismPermitId: string;

  @PrimaryColumn('uuid')
  permissionProfileId: string;

  @ManyToOne(
    () => MechanismPermit,
    (mechanismPermit) =>
      mechanismPermit.permissionProfileManagedThroughMechanismPermits,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'mechanismPermitId' })
  @Index()
  mechanismPermit: MechanismPermit;

  @ManyToOne(
    () => PermissionProfile,
    (permissionProfile) =>
      permissionProfile.permissionProfileManagedThroughMechanismPermits,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'permissionProfileId' })
  @Index()
  permissionProfile: PermissionProfile;

  @Column({ type: 'boolean', default: false })
  isPermitted: boolean;
}
