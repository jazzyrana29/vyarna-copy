import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('milestone', { schema: process.env.TIDB_DATABASE })
export class Milestone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
