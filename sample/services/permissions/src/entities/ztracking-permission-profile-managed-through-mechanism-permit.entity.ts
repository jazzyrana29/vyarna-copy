import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_permission_profile_managed_through_mechanism_permits', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingPermissionProfileManagedThroughMechanismPermit {
  @PrimaryGeneratedColumn()
  ztrackingVersion: number;

  @Column()
  mechanismPermitId: string;

  @Column()
  permissionProfileId: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isPermitted: boolean;

  @CreateDateColumn()
  versionDate: Date;
}
