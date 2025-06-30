import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PermissionProfile } from './permission-profile.entity';

@Entity('operator_permission_profiles', {
  schema: process.env.TIDB_DATABASE,
})
export class OperatorPermissionProfile extends BaseEntity {
  @PrimaryColumn('uuid')
  operatorId: string;

  @PrimaryColumn('uuid')
  permissionProfileId: string;

  @ManyToOne(
    () => PermissionProfile,
    (permissionProfile) => permissionProfile.operatorPermissionProfiles,
  )
  permissionProfile: PermissionProfile;

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
}
