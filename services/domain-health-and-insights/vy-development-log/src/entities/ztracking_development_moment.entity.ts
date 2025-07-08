import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_development_moment', { schema: process.env.TIDB_DATABASE })
export class ZtrackingDevelopmentMoment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  momentId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  photoUrl?: string;

  @Column('timestamp')
  timestamp: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
