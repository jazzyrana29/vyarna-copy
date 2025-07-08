import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sleep_pattern_summary', { schema: process.env.TIDB_DATABASE })
export class SleepPatternSummary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  summaryId: string;

  @Column('uuid')
  babyId: string;

  @Column({ type: 'varchar', length: 10 })
  periodType: 'DAILY' | 'WEEKLY';

  @Column('date')
  periodStart: string;

  @Column('int')
  avgDurationS: number;

  @Column('float')
  avgInterruptions: number;

  @Column('float')
  sleepEfficiency: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
