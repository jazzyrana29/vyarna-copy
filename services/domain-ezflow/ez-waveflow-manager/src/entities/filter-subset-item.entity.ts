import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FilterSubset } from './filter-subset.entity';
import { EvaluationVariable } from './evaluation-variable.entity';
import { EvaluationOperator } from './evaluation-operator.entity';

@Entity('filter_subset_items', { schema: process.env.TIDB_DATABASE })
export class FilterSubsetItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  filterSubsetItemId: string;

  // Many-to-One relationship with FilterSubset
  @ManyToOne(
    () => FilterSubset,
    (filterSubset) => filterSubset.filterSubsetItems,
  )
  @JoinColumn({ name: 'filterSubsetId' })
  filterSubset: FilterSubset;

  @Column('uuid')
  @Index()
  filterSubsetId: string;

  // Many-to-One relationship with EvaluationVariable
  @ManyToOne(() => EvaluationVariable)
  @JoinColumn({ name: 'evaluationVariableId' })
  evaluationVariable: EvaluationVariable;

  @Column('uuid')
  evaluationVariableId: string;

  // Many-to-One relationship with EvaluationOperator
  @ManyToOne(() => EvaluationOperator)
  @JoinColumn({ name: 'evaluationOperatorId' })
  evaluationOperator: EvaluationOperator;

  @Column('uuid')
  evaluationOperatorId: string;

  // Evaluation Value
  @Column({ type: 'varchar', length: 500 })
  evaluationValue: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
