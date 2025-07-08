import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('sleep_session', { schema: process.env.TIDB_DATABASE })
export class SleepSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
