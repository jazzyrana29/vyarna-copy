import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_schedule', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepSchedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  scheduleId: string;

  @Column('uuid')
  babyId: string;

  @Column('int')
  dayOfWeek: number;

  @Column('time')
  windowStart: string;

  @Column('time')
  windowEnd: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
