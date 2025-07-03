import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('diaper_change', { schema: process.env.TIDB_DATABASE })
export class DiaperChange extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  diaperChangeId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 6 })
  changeType: 'WET' | 'SOILED' | 'BOTH';

  @Column('timestamp')
  timestamp: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
