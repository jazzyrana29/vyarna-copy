import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_milestone', { schema: process.env.TIDB_DATABASE })
export class ZtrackingMilestone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  milestoneId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 30 })
  milestoneType: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('timestamp')
  achievedAt: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
