import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_eval_variable_through_eval_variable_collections', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingEvaluationVariableIsGroupedThroughEvaluationVariableCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  evaluationVariableIsGroupedThroughEvaluationVariableCollectionId: string;

  @Index()
  @Column('uuid')
  evaluationVariableCollectionId: string;

  @Column('uuid')
  evaluationVariableId: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
