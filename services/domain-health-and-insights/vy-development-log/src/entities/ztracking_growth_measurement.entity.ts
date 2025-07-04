import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_growth_measurement', { schema: process.env.TIDB_DATABASE })
export class ZtrackingGrowthMeasurement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  growthId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 30 })
  measurementType: string;

  @Column('float')
  value: number;

  @Column({ type: 'varchar', length: 10 })
  unit: string;

  @Column('timestamp')
  timestamp: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
