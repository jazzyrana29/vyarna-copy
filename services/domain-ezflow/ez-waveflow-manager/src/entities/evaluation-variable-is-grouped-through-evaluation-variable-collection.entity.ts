// EvaluationVariableIsGroupedThroughEvaluationVariableCollections.ts

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EvaluationVariableCollection } from './evaluation-variable-collection.entity';
import { EvaluationVariable } from './evaluation-variable.entity';

@Entity('evaluation_variable_through_evaluation_variable_collections', {
  schema: process.env.TIDB_DATABASE,
})
export class EvaluationVariableIsGroupedThroughEvaluationVariableCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  evaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string;

  @ManyToOne(
    () => EvaluationVariableCollection,
    (collection) =>
      collection.evaluationVariableIsGroupedThroughEvaluationVariableCollections,
  )
  evaluationVariableCollection: EvaluationVariableCollection;

  @ManyToOne(
    () => EvaluationVariable,
    (variable) =>
      variable.evaluationVariableIsGroupedThroughEvaluationVariableCollections,
  )
  evaluationVariable: EvaluationVariable;

  // Additional attributes specific to this relationship
  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
