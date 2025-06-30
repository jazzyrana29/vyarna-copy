import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { TaskTypesReceiveInputValueType } from './task-types-receive-input-value-type.entity';
import { TaskTypeHaveAccessToBusinessUnit } from './task-type-have-access-to-business-unit.entity';

@Entity('task_types', { schema: process.env.TIDB_DATABASE })
export class TaskType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  taskTypeId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  @ManyToOne(() => Task, (task) => task.taskTypes)
  task: Task;

  @OneToMany(() => Task, (task) => task.taskId)
  tasks: Task[];

  @OneToMany(
    () => TaskTypesReceiveInputValueType,
    (taskTypeReceiveInputValueType) => taskTypeReceiveInputValueType.taskType,
  )
  taskTypesReceiveInputValueTypes: TaskTypesReceiveInputValueType[];

  @OneToMany(
    () => TaskTypeHaveAccessToBusinessUnit,
    (taskTypeHaveAccessToBusinessUnit) =>
      taskTypeHaveAccessToBusinessUnit.taskType,
  )
  accessibleBusinessUnits: TaskTypeHaveAccessToBusinessUnit[];

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
