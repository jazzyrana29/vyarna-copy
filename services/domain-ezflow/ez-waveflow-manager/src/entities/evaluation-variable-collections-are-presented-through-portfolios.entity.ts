import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { EvaluationVariableCollectionPortfolio } from './evaluation-variable-collection-portfolio.entity';
import { EvaluationVariableCollection } from './evaluation-variable-collection.entity';

@Entity('evaluation_variable_collections_are_presented_through_portfolios', {
  schema: process.env.TIDB_DATABASE,
})
export class EvaluationVariableCollectionsArePresentedThroughPortfolios extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  evaluationVariableCollectionsArePresentedThroughPortfoliosId: string;

  @ManyToOne(
    () => EvaluationVariableCollectionPortfolio,
    (portfolio) =>
      portfolio.evaluationVariableCollectionsArePresentedThroughPortfolios,
  )
  @JoinColumn({ name: 'portfolio' }) // Es
  evaluationVariableCollectionPortfolio: EvaluationVariableCollectionPortfolio;

  @ManyToOne(
    () => EvaluationVariableCollection,
    (collection) =>
      collection.evaluationVariableCollectionsArePresentedThroughPortfolios,
  )
  @JoinColumn({ name: 'collection' })
  evaluationVariableCollection: EvaluationVariableCollection;

  // Additional attributes specific to this relationship
  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
