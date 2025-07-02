import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SystemMechanism } from './system-mechanism.entity';
import { PermissionProfileManagedThroughMechanismPermit } from './permission-profile-managed-through-mechanism-permit.entity';

@Entity('mechanism_permits', { schema: process.env.TIDB_DATABASE })
@Index(['name', 'mechanismPermitId'], { unique: true })
export class MechanismPermit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  mechanismPermitId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  @ManyToOne(
    () => SystemMechanism,
    (systemMechanism) => systemMechanism.mechanismPermits,
  )
  @Column('uuid')
  systemMechanismId: string;

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
      permissionProfileManagedThroughMechanismPermit.mechanismPermit,
  )
  permissionProfileManagedThroughMechanismPermits: PermissionProfileManagedThroughMechanismPermit[];
}
