import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_waves', { schema: process.env.TIDB_DATABASE })
export class ZtrackingWave extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  waveId: string;

  @Column('uuid')
  executionFlowId: string;

  @Column({ type: 'timestamp', nullable: true })
  executionStartDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  executionEndDate?: Date;

  @Column({ type: 'varchar', length: 50 })
  waveStatus: 'InExecution' | 'FailedWithError' | 'Completed';

  @Column({ type: 'json', nullable: true })
  returnVariables?: Record<string, unknown>;

  @Column({ nullable: true })
  isDeleted?: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
