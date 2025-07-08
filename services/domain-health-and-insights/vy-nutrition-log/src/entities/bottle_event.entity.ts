import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bottle_event', { schema: process.env.TIDB_DATABASE })
export class BottleEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;
}
