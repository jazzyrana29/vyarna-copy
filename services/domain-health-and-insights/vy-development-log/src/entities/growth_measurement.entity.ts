import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('growth_measurement', { schema: process.env.TIDB_DATABASE })
export class GrowthMeasurement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;
}
