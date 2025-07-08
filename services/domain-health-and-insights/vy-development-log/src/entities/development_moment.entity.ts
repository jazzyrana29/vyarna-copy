import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('development_moment', { schema: process.env.TIDB_DATABASE })
export class DevelopmentMoment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
