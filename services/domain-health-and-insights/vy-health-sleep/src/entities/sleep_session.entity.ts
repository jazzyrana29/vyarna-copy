import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('sleep_session', { schema: process.env.TIDB_DATABASE })
export class SleepSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  sessionId: string;

  @Column('uuid')
  babyId: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;
}
