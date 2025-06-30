import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
} from 'typeorm';

@Entity('ztracking_evaluation_variable_collections', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingEvaluationVariableCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column({ type: 'uuid' })
  @Index()
  evaluationVariableCollectionId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Index()
  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  versionDate: Date;
}
