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

@Entity('sleep_event', { schema: process.env.TIDB_DATABASE })
export class SleepEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 10 })
  eventType: 'START' | 'WAKE' | 'RESUME' | 'END';

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
