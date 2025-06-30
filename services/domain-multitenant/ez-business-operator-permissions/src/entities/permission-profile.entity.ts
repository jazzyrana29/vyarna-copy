import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PermissionProfileManagedThroughMechanismPermit } from './permission-profile-managed-through-mechanism-permit.entity';
import { OperatorPermissionProfile } from './operator-permission-profile.entity';

@Entity('permission_profiles', { schema: process.env.TIDB_DATABASE })
@Index(['name', 'businessUnitId'], { unique: true })
export class PermissionProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  permissionProfileId: string;

  @Column('uuid', { nullable: true })
  @Index()
  businessUnitId: string;

  @OneToMany(
    () => OperatorPermissionProfile,
    (operatorPermissionProfile) => operatorPermissionProfile.permissionProfile,
  )
  operatorPermissionProfiles: OperatorPermissionProfile[];

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => PermissionProfileManagedThroughMechanismPermit,
    (permissionProfileManagedThroughMechanismPermit) =>
      permissionProfileManagedThroughMechanismPermit.permissionProfile,
  )
  permissionProfileManagedThroughMechanismPermits: PermissionProfileManagedThroughMechanismPermit[];
}
