import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_filter_subset_items', { schema: process.env.TIDB_DATABASE })
export class ZtrackingFilterSubsetItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  filterSubsetItemId: string;

  @Column('uuid', { nullable: true })
  filterSubsetId: string;

  @Column('uuid', { nullable: true })
  evaluationVariableId: string;

  @Column('uuid', { nullable: true })
  evaluationOperatorId: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  evaluationValue: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
