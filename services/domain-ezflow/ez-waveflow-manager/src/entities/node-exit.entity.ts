// NodeExit.ts

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
import { Node } from './node.entity';
import { NodeExitType } from './node-exit-type.entity';
import { Filter } from './filter.entity';
import { Task } from './task.entity';

@Entity('node_exits', { schema: process.env.TIDB_DATABASE })
export class NodeExit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  nodeExitId: string;

  @ManyToOne(() => Node, (node) => node.nodeExits)
  @JoinColumn({ name: 'sourceNodeId' })
  sourceNode: Node;

  @Column('uuid')
  sourceNodeId: string;

  @ManyToOne(() => Node, (node) => node.incomingExits, { nullable: true })
  @JoinColumn({ name: 'targetNodeId' })
  targetNode: Node;

  @Column('uuid', { nullable: true })
  targetNodeId: string;

  @ManyToOne(() => NodeExitType, (nodeExitType) => nodeExitType.nodeExits)
  @JoinColumn({ name: 'nodeExitTypeId' })
  nodeExitType: NodeExitType;

  @Column('uuid')
  nodeExitTypeId: string;

  @OneToOne(() => Filter, (filter) => filter.nodeExit)
  @JoinColumn({ name: 'filterId' })
  filter: Filter;

  @Column('uuid', { nullable: true })
  filterId: string;

  @OneToMany(() => Task, (task) => task.isExecutedFrom)
  executedTasks: Task[];

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
