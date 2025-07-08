import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_notification', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepNotification extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
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

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column()
  versionDate: Date;
}
