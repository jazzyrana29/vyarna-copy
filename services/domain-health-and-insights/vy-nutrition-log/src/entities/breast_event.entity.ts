import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('breast_event', { schema: process.env.TIDB_DATABASE })
export class BreastEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 10 })
  side: string;

  @Column({ type: 'varchar', length: 10 })
  action: string;

  @Column('timestamp')
  eventTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
