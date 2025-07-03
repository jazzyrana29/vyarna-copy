import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ztracking_diaper_change', { schema: process.env.TIDB_DATABASE })
export class ZtrackingDiaperChange extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
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

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
