import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EvaluationVariablesAreAvailableForWaveTypes } from './evaluation-variables-are-available-for-wave-types.entity'; // Import the new entity

// TODO: This entity is schematic, it must be changed once it is defined.
@Entity('environmental_variables', { schema: process.env.TIDB_DATABASE })
export class EnvironmentalVariable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  environmentalVariableId: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  // New one-to-many relationship with EvaluationVariablesAreAvailableForWaveTypes
  @OneToMany(
    () => EvaluationVariablesAreAvailableForWaveTypes,
    (relation) => relation.environmentalVariable,
  )
  evaluationVariablesAreAvailableForWaveTypes: EvaluationVariablesAreAvailableForWaveTypes[];

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
