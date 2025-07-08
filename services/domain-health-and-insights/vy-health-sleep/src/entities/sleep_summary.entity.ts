import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sleep_summary', { schema: process.env.TIDB_DATABASE })
export class SleepSummary extends BaseEntity {
  @PrimaryColumn('uuid')
  sessionId: string;

  @Column('int')
  totalSleepSecs: number;

  @Column('int')
  totalInterruptions: number;

  @Column('int')
  avgInterruptionSecs: number;

  @Column('int')
  longestBlockSecs: number;

  @Column('float')
  sleepEfficiency: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
