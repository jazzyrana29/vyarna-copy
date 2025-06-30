// ZtrackingFlow.ts

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_flows', { schema: process.env.TIDB_DATABASE })
export class ZtrackingFlow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  flowId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Index()
  description: string;

  @Column('uuid', { nullable: true })
  waveTypeId: string;

  @Column('uuid', { nullable: true })
  businessUnitId: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ default: false, nullable: true })
  @Index()
  isPublished: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
