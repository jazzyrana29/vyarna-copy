import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_temperature_measurement', { schema: process.env.TIDB_DATABASE })
export class ZtrackingTemperatureMeasurement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  tempId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column('float')
  temperature: number;

  @Column({ type: 'varchar', length: 1 })
  unit: 'C' | 'F';

  @Column('timestamp')
  eventTime: Date;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
