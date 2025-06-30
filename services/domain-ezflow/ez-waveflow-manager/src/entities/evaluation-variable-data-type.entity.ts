import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EvaluationOperator } from './evaluation-operator.entity';
import { EvaluationVariable } from './evaluation-variable.entity';

@Entity('evaluation_variable_data_types', { schema: process.env.TIDB_DATABASE })
export class EvaluationVariableDataType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  evaluationVariableDataTypeId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  // Establish a one-to-many relationship to EvaluationVariable
  @OneToMany(
    () => EvaluationVariable,
    (evaluationVariable) =>
      evaluationVariable.evaluationVariableDataType
        .evaluationVariableDataTypeId,
  )
  evaluationVariables: EvaluationVariable[];

  // Define the many-to-many relationship with EvaluationOperator

  @ManyToMany(
    () => EvaluationOperator,
    (evaluationOperator) => evaluationOperator.evaluationVariableDataTypes,
  )
  evaluationOperators: EvaluationOperator[];

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
