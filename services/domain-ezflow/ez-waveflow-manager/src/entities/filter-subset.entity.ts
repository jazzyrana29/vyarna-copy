import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filter } from './filter.entity';
import { FilterSubsetItem } from './filter-subset-item.entity';

@Entity('filter_subsets', { schema: process.env.TIDB_DATABASE })
export class FilterSubset extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  filterSubsetId: string;

  // Order in which the FilterSubset is shown and executed within the Filter
  @Column({ type: 'int' })
  filterOrder: number;

  // Logical binding for FilterSubsetItems within this FilterSubset: "AND" or "OR"
  @Column({ type: 'varchar', length: 50 })
  filterSubsetInternalLogicalBinding: string;

  // Logical binding for this FilterSubset with the next subset in the filter: "AND" or "OR"
  @Column({ type: 'varchar', length: 50, nullable: true })
  nextFilterSubsetLogicalBinding?: string;

  // Many-to-One relationship with Filter
  @ManyToOne(() => Filter, (filter) => filter.filterSubsets)
  @JoinColumn({ name: 'filterId' })
  filter: Filter;

  @Column('uuid')
  @Index()
  filterId: string;

  // One-to-Many relationship with FilterSubsetItems
  @OneToMany(
    () => FilterSubsetItem,
    (filterSubsetItem) => filterSubsetItem.filterSubset,
  )
  filterSubsetItems: FilterSubsetItem[];

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
