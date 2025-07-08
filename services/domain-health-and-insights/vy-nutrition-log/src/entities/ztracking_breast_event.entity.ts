import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ztracking_breast_event', { schema: process.env.TIDB_DATABASE })
export class ZtrackingBreastEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column({ type: 'varchar', length: 10 })
  side: string;

  @Column({ type: 'varchar', length: 10 })
  action: string;

  @Column('timestamp')
  eventTime: Date;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
