import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ztracking_bottle_event', { schema: process.env.TIDB_DATABASE })
export class ZtrackingBottleEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 10 })
  action: string;

  @Column({ type: 'varchar', length: 12 })
  contentType: string;

  @Column('int', { nullable: true })
  volumeStartMl?: number;

  @Column('int', { nullable: true })
  volumeEndMl?: number;

  @Column('timestamp')
  eventTime: Date;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
