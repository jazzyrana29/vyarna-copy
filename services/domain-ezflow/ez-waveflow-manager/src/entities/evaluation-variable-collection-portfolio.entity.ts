import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { EvaluationVariableCollectionsArePresentedThroughPortfolios } from './evaluation-variable-collections-are-presented-through-portfolios.entity';

@Entity('evaluation_variable_collection_portfolios', {
  schema: process.env.TIDB_DATABASE,
})
export class EvaluationVariableCollectionPortfolio extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  evaluationVariableCollectionPortfolioId: string;

  @Column({ type: 'uuid' })
  businessUnitId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  // One-to-Many relationship to the join entity
  @OneToMany(
    () => EvaluationVariableCollectionsArePresentedThroughPortfolios,
    (evcptp) => evcptp.evaluationVariableCollectionPortfolio,
  )
  evaluationVariableCollectionsArePresentedThroughPortfolios: EvaluationVariableCollectionsArePresentedThroughPortfolios[];

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
