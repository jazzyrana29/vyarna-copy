import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_interruption_reason', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepInterruptionReason extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  reasonId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 20 })
  reasonType: 'HUNGER' | 'DIAPER' | 'NOISE' | 'DISCOMFORT' | 'OTHER';

  @Column('timestamp')
  eventTime: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
