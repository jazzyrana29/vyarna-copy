import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_pattern_summary', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepPatternSummary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
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

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column()
  versionDate: Date;
}
