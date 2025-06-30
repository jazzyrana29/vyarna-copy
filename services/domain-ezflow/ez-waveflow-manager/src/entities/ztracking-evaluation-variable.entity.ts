import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Index,
} from 'typeorm';
import { IsUUID } from 'class-validator';

@Entity('ztracking_evaluation_variables', { schema: process.env.TIDB_DATABASE })
export class ZtrackingEvaluationVariable extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column()
  @IsUUID()
  evaluationVariableId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Index()
  name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column('uuid', { nullable: true })
  evaluationVariableDataTypeId?: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  isDeleted?: boolean;

  @Column()
  @Index()
  versionDate: Date;
}
