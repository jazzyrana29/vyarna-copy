import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_evaluation_variables_are_available_for_wave_types', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingEvaluationVariablesAreAvailableForWaveTypes extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string; // Identity column for versioning

  @Index()
  @Column('uuid')
  waveTypeId: string; // Primary column from the original entity

  @Index()
  @Column('uuid')
  environmentalVariableId: string; // Primary column from the original entity

  @Column({ type: 'boolean', nullable: true })
  isAvailable: boolean; // Track if the variable is available

  @Column({ nullable: true })
  isDeleted?: boolean; // To track logical deletion

  @Column({ nullable: true })
  updatedBy?: string; // To track who updated

  @Column({ nullable: true })
  createdAt?: Date; // Keep as nullable in ztracking pattern

  @Index()
  @Column()
  versionDate: Date; // Date of versioning
}
