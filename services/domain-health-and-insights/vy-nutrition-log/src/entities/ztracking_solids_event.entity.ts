import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ztracking_solids_event', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSolidsEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
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

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
