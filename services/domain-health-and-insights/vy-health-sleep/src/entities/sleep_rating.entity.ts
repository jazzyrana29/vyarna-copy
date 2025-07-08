import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sleep_rating', { schema: process.env.TIDB_DATABASE })
export class SleepRating extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
