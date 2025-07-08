import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_sleep_rating', { schema: process.env.TIDB_DATABASE })
export class ZtrackingSleepRating extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  ratingId: string;

  @Column('uuid')
  sessionId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 10 })
  ratingType: 'QUALITY' | 'MOOD';

  @Column('int')
  ratingValue: number;

  @Column('timestamp')
  ratingTime: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
