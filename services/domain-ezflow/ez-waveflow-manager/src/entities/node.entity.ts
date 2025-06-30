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
import { NodeExit } from './node-exit.entity';
import { Flow } from './flow.entity';
import { NodeType } from './node-type.entity';
import { Task } from './task.entity';
import { Manifold } from './manifold.entity';
import { Action } from './action.entity';

@Entity('nodes', { schema: process.env.TIDB_DATABASE })
export class Node extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  nodeId: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  name: string;

  @Column({ type: 'float' })
  positionX: number;

  @Column({ type: 'float' })
  positionY: number;

  @ManyToOne(() => Flow, (flow) => flow.nodes)
  @JoinColumn({ name: 'flowId' })
  flow: Flow;

  @Column('uuid')
  flowId: string;

  @ManyToOne(() => NodeType, (nodeType) => nodeType.nodes)
  @JoinColumn({ name: 'nodeTypeId' })
  nodeType: NodeType;

  @Column('uuid')
  nodeTypeId: string;

  @OneToMany(() => NodeExit, (nodeExit) => nodeExit.sourceNode)
  nodeExits: NodeExit[];

  @OneToMany(() => NodeExit, (nodeExit) => nodeExit.targetNode, {
    nullable: true,
  })
  incomingExits: NodeExit[];

  @OneToMany(() => Task, (task) => task.node)
  tasks: Task[];

  @OneToOne(() => Manifold, (manifold) => manifold.node, { nullable: true })
  @JoinColumn({ name: 'manifoldId' })
  manifold?: Manifold;

  @Column({ type: 'uuid', nullable: true })
  manifoldId?: string;

  @OneToOne(() => Action, (action) => action.node, {
    nullable: true,
  })
  @JoinColumn({ name: 'actionId' })
  action?: Action;

  @Column({ type: 'uuid', nullable: true })
  actionId?: string;

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
