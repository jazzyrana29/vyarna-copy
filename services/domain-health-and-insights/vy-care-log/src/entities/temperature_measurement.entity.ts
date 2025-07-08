import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('temperature_measurement', { schema: process.env.TIDB_DATABASE })
@Index(['babyId', 'eventTime'])
@Index(['personId', 'createdAt'])
export class TemperatureMeasurement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
