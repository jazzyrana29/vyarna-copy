import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity('ztracking_evaluation_variable_collection_portfolios', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingEvaluationVariableCollectionPortfolio extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column({ type: 'uuid' })
  evaluationVariableCollectionPortfolioId: string;

  @Column({ type: 'uuid' })
  businessUnitId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Index()
  description?: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted?: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column()
  versionDate: Date;
}
