import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_sleep_session', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  sessionId: string;

  @Column('uuid')
  babyId: string;

  @Column('timestamp')
  start: Date;

  @Column('timestamp')
  end: Date;

  @Column()
  versionDate: Date;
}
