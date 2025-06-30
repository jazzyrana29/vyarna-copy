import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
  TableInheritance,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Node } from './node.entity';
import { ActionVariable } from './action-variable.entity';

@Entity('actions', { schema: process.env.TIDB_DATABASE })
@TableInheritance({ column: { type: 'varchar', name: 'actionType' } })
export class Action extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  actionId: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  actionType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @OneToOne(() => Node, (node) => node.action, { nullable: true })
  @JoinColumn({ name: 'nodeId' })
  node: Node;

  @Column({ type: 'uuid', nullable: true })
  nodeId: string;

  @ManyToMany(
    () => ActionVariable,
    (actionVariable) => actionVariable.actions,
    {
      cascade: true,
    },
  )
  @JoinTable({
    name: 'actions_action_variables', // The join table name (customize as needed)
    joinColumn: { name: 'actionId' },
    inverseJoinColumn: { name: 'actionVariableId' },
  })
  actionVariables: ActionVariable[];

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
