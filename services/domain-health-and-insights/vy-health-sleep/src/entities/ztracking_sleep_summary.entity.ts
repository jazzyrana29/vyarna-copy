import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_summary', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepSummary extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

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

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
