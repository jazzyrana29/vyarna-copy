import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity('ztracking_eval_var_collections_presented_through_portfolios', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingEvaluationVariableCollectionsArePresentedThroughPortfolios extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column()
  evaluationVariableCollectionsArePresentedThroughPortfoliosId: string;

  @Column()
  versionDate: Date;

  @Column({ nullable: true })
  evaluationVariableCollectionPortfolioId?: string;

  @Column({ nullable: true })
  evaluationVariableCollectionId?: string;

  @Column({ nullable: true })
  isDeleted?: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  createdAt?: Date;
}
