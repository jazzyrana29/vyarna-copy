import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Filter } from './filter.entity';
import { Node } from './node.entity';

@Entity('manifolds', { schema: process.env.TIDB_DATABASE })
export class Manifold extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  manifoldId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  // Execution style: "RUN All" or "STOP ON HIT"
  @Column({ type: 'varchar', length: 50 })
  executionStyle: string;

  // One-to-Many relationship with Filters
  @OneToMany(() => Filter, (filter) => filter.manifold)
  filters: Filter[];

  @OneToOne(() => Node, (node) => node.manifold, { nullable: true })
  @JoinColumn({ name: 'nodeId' })
  node: Node;

  // This column will store the Node's primary key
  @Column({ type: 'uuid', nullable: true })
  nodeId: string;

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
