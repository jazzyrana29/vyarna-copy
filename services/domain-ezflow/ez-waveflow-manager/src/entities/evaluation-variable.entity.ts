import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsUUID } from 'class-validator';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from './evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';
import { EvaluationVariableDataType } from './evaluation-variable-data-type.entity';

@Entity('evaluation_variables', { schema: process.env.TIDB_DATABASE })
export class EvaluationVariable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  evaluationVariableId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  // One-to-Many relationship to the join entity
  @OneToMany(
    () => EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
    (evigtvc) => evigtvc.evaluationVariable,
  )
  evaluationVariableIsGroupedThroughEvaluationVariableCollections: EvaluationVariableIsGroupedThroughEvaluationVariableCollection[];

  @ManyToOne(
    () => EvaluationVariableDataType,
    (evaluationVariableDataType) =>
      evaluationVariableDataType.evaluationVariables,
  )
  @JoinColumn({ name: 'evaluationVariableDataTypeId' })
  evaluationVariableDataType: EvaluationVariableDataType;

  @Column('uuid')
  @Index()
  evaluationVariableDataTypeId: string;

  @Column({ type: 'json', nullable: true })
  evaluationValueOptions: Array<{ ID: string; name: string }> | null;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
