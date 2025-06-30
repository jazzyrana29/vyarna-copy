import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskType } from './task-type.entity';
import { Node } from './node.entity';
import { NodeExit } from './node-exit.entity';
import { Wave } from './wave.entity';
import { TaskStatus } from './task-status.entity';
import { TaskHasReceiveInputValueOfType } from './task-has-received-input-value-of-type.entity';

@Entity('tasks', { schema: process.env.TIDB_DATABASE })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  taskId: string;

  @Column('uuid')
  @Index()
  nodeId: string;

  @ManyToOne(() => Node, (node) => node.tasks)
  @JoinColumn({ name: 'nodeId' })
  node: Node;

  @ManyToOne(() => NodeExit, (nodeExit) => nodeExit.executedTasks)
  @JoinColumn({ name: 'isExecutedFromId' })
  isExecutedFrom: NodeExit;

  @Column('uuid', { nullable: true })
  isExecutedFromId: string;

  @Column('uuid')
  @Index()
  taskStatusId: string;

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.tasks)
  @JoinColumn({ name: 'taskStatusId' })
  taskStatus: TaskStatus;

  @OneToMany(() => TaskType, (taskType) => taskType.task)
  taskTypes: TaskType[];

  @ManyToOne(() => Wave, (wave) => wave.tasks)
  @JoinColumn({ name: 'waveId' })
  wave: Wave;

  @Column('uuid', { nullable: true })
  waveId: string;

  @OneToMany(
    () => TaskHasReceiveInputValueOfType,
    (taskHasReceiveInputValueOfType) => taskHasReceiveInputValueOfType.task,
  )
  haveInputValuesOfType: TaskHasReceiveInputValueOfType[];

  @ManyToMany(() => NodeExit)
  @JoinTable({
    name: 'task_exits_through',

    joinColumn: { name: 'taskId' },

    inverseJoinColumn: { name: 'nodeExitId' },
  })
  exitsThrough: NodeExit[];

  @Column({ type: 'json', nullable: true })
  initialInputVariables: any;

  @Column({ type: 'json', nullable: true })
  finalInputVariables: any;

  @Column({ type: 'timestamp', nullable: true })
  dateStart: Date;

  @Column({ type: 'timestamp', nullable: true })
  dateEnd: Date;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
