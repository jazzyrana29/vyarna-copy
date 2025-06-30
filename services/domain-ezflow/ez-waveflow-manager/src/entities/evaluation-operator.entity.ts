import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EvaluationVariableDataType } from './evaluation-variable-data-type.entity';

@Entity('evaluation_operators', { schema: process.env.TIDB_DATABASE })
export class EvaluationOperator extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  evaluationOperatorId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 50 })
  symbol: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  choiceType: string;

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

  // Define the many-to-many relationship with EvaluationVariableDataType
  @ManyToMany(
    () => EvaluationVariableDataType,
    (dataType) => dataType.evaluationOperators,
  )
  @JoinTable({
    name: 'evaluation_operator_evaluation_variable_data_type', // Name of the join table
    joinColumn: {
      name: 'evaluationOperatorId',
      referencedColumnName: 'evaluationOperatorId',
    },
    inverseJoinColumn: {
      name: 'evaluationVariableDataTypeId',
      referencedColumnName: 'evaluationVariableDataTypeId',
    },
  })
  evaluationVariableDataTypes: EvaluationVariableDataType[];
}
