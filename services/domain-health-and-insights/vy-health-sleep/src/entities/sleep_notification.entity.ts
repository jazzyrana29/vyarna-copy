import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sleep_notification', { schema: process.env.TIDB_DATABASE })
export class SleepNotification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  notificationId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column('uuid', { nullable: true })
  sessionId?: string;

  @Column({ type: 'varchar', length: 10 })
  channel: 'PUSH' | 'EMAIL' | 'SMS';

  @Column('timestamp')
  scheduledFor: Date;

  @Column('timestamp', { nullable: true })
  sentAt?: Date;

  @Column({ type: 'varchar', length: 10 })
  status: 'PENDING' | 'SENT' | 'FAILED';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
