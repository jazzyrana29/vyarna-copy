import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sleep_interruption_reason', { schema: process.env.TIDB_DATABASE })
export class SleepInterruptionReason extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  reasonId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 20 })
  reasonType: 'HUNGER' | 'DIAPER' | 'NOISE' | 'DISCOMFORT' | 'OTHER';

  @Column('timestamp')
  eventTime: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
