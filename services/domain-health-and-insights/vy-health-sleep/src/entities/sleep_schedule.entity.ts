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

@Entity('sleep_schedule', { schema: process.env.TIDB_DATABASE })
export class SleepSchedule extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  scheduleId: string;

  @Column('uuid')
  babyId: string;

  @Column('int')
  dayOfWeek: number;

  @Column('time')
  windowStart: string;

  @Column('time')
  windowEnd: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
