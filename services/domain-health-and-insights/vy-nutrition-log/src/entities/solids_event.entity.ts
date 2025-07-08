import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('solids_event', { schema: process.env.TIDB_DATABASE })
export class SolidsEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  eventId: string;

  @Column('uuid')
  sessionId: string;

  @Column('simple-array', { nullable: true })
  foodIds?: string[];

  @Column('simple-json', { nullable: true })
  servings?: any;

  @Column({ type: 'varchar', length: 10, nullable: true })
  reaction?: string;

  @Column('timestamp')
  eventTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
