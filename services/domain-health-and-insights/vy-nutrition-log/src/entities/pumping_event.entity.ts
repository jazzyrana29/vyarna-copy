import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pumping_event', { schema: process.env.TIDB_DATABASE })
export class PumpingEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;
}
