import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_permission_profiles', { schema: process.env.TIDB_DATABASE })
export class ZtrackingPermissionProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column('uuid')
  permissionProfileId: string;

  @Column('uuid', { nullable: true })
  @Index()
  businessUnitId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Index()
  description: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
