import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_filter_subsets', { schema: process.env.TIDB_DATABASE })
export class ZtrackingFilterSubset extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  filterSubsetId: string;

  @Column({ type: 'int', nullable: true })
  filterOrder: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  filterSubsetInternalLogicalBinding: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nextFilterSubsetLogicalBinding?: string;

  @Column('uuid', { nullable: true })
  filterId: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
