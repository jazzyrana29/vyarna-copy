import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ztracking_pumping_event', { schema: process.env.TIDB_DATABASE })
export class ZtrackingPumpingEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 15 })
  action: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  pumpType?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  side?: string;

  @Column('int', { nullable: true })
  volumeMl?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bagLabel?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  storageStatus?: string;

  @Column('date', { nullable: true })
  expirationDate?: string | Date;

  @Column('timestamp')
  eventTime: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
