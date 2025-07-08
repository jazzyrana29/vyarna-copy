import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_medication_administration', { schema: process.env.TIDB_DATABASE })
export class ZtrackingMedicationAdministration extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
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

  @Column({ default: false, nullable: true })
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
