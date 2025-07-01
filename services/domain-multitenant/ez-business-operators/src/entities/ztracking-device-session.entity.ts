import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_device_sessions', { schema: process.env.TIDB_DATABASE })
export class ZtrackingDeviceSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  deviceSessionId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  name: string;

  @Column('uuid', { nullable: true })
  deviceId: string;

  @Column({ nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
