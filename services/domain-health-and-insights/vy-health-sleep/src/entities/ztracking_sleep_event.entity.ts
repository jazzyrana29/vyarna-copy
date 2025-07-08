import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_event', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 10 })
  eventType: 'START' | 'WAKE' | 'RESUME' | 'END';

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
