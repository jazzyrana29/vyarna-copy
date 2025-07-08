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

@Entity('medication_administration', { schema: process.env.TIDB_DATABASE })
@Index(['babyId', 'eventTime'])
@Index(['personId', 'createdAt'])
export class MedicationAdministration extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  medAdminId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column('uuid', { nullable: true })
  babyMedicationId?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  medicationName?: string;

  @Column('float')
  dosage: number;

  @Column({ type: 'varchar', length: 10 })
  unit: string;

  @Column({ type: 'varchar', length: 50 })
  route: 'ORAL' | 'TOPICAL' | 'INJECTION' | 'INHALATION';

  @Column('timestamp')
  eventTime: Date;

  @Column('text', { nullable: true })
  photoUrl?: string;

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
