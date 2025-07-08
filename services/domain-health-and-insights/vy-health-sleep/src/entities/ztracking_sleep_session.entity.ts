import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('ztracking_sleep_session', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  sessionId: string;

  @Column('uuid')
  personId: string;

  @Column('uuid')
  babyId: string;

  @Column({ type: 'varchar', length: 10 })
  type: 'NAP' | 'NIGHT';

  @Column({ type: 'varchar', length: 12 })
  status: 'IN_PROGRESS' | 'COMPLETED';

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp', { nullable: true })
  endTime?: Date;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
