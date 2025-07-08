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

@Entity('symptom_report', { schema: process.env.TIDB_DATABASE })
@Index(['babyId', 'eventTime'])
@Index(['personId', 'createdAt'])
export class SymptomReport extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  symptomId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 50 })
  symptomType: string;

  @Column({ type: 'varchar', length: 10 })
  severity: 'MILD' | 'MODERATE' | 'SEVERE';

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
