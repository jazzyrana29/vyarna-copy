import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Manifold } from './manifold.entity';
import { FilterSubset } from './filter-subset.entity';
import { NodeExit } from './node-exit.entity';

@Entity('filters', { schema: process.env.TIDB_DATABASE })
export class Filter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  filterId: string;

  @Column({ type: 'varchar', length: 50 })
  filterName: string;

  @Column({ type: 'varchar', length: 500 })
  filterDescription: string;

  @Column({ default: true })
  @Index()
  isActive: boolean;

  // Order in which the Filter is shown and executed within the Manifold
  @Column({ type: 'int' })
  manifoldOrder: number;

  // Many-to-One relationship with Manifold
  @ManyToOne(() => Manifold, (manifold) => manifold.filters)
  @JoinColumn({ name: 'manifoldId' })
  manifold: Manifold;

  @Column('uuid')
  @Index()
  manifoldId: string;

  // One-to-One relationship with NodeExit
  @OneToOne(() => NodeExit, (nodeExit) => nodeExit.filter)
  @JoinColumn({ name: 'nodeExitId' })
  nodeExit: NodeExit;

  @Column('uuid')
  nodeExitId: string;

  // One-to-Many relationship with FilterSubsets
  @OneToMany(() => FilterSubset, (filterSubset) => filterSubset.filter)
  filterSubsets: FilterSubset[];

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
