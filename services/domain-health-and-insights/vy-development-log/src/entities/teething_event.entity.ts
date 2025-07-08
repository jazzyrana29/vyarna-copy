import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('teething_event', { schema: process.env.TIDB_DATABASE })
export class TeethingEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  teethingId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 50 })
  toothName: string;

  @Column('date')
  eruptionDate: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
