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
import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from './evaluation-variable-collections-are-presented-through-portfolios.entity';
import { EvaluationVariableIsGroupedThroughEvaluationVariableCollection } from './evaluation-variable-is-grouped-through-evaluation-variable-collection.entity';

@Entity('evaluation_variable_collections', {
  schema: process.env.TIDB_DATABASE,
})
export class EvaluationVariableCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  evaluationVariableCollectionId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  // One-to-Many relationship to the join entity with Portfolios
  @OneToMany(
    () => EvaluationVariableCollectionsArePresentedThroughPortfolios,
    (evcptp) => evcptp.evaluationVariableCollection,
  )
  evaluationVariableCollectionsArePresentedThroughPortfolios: EvaluationVariableCollectionsArePresentedThroughPortfolios[];

  // One-to-Many relationship to the join entity with Variables
  @OneToMany(
    () => EvaluationVariableIsGroupedThroughEvaluationVariableCollection,
    (evigtvc) => evigtvc.evaluationVariableCollection,
  )
  evaluationVariableIsGroupedThroughEvaluationVariableCollections: EvaluationVariableIsGroupedThroughEvaluationVariableCollection[];

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
