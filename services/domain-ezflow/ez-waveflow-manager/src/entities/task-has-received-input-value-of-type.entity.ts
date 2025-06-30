import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { InputValueType } from './input-value-type.entity';

@Entity('task_has_receive_input_value_of_type', {
  schema: process.env.TIDB_DATABASE,
})
export class TaskHasReceiveInputValueOfType extends BaseEntity {
  @PrimaryColumn('uuid')
  inputValueTypeId: string;

  @PrimaryColumn('uuid')
  taskId: string;

  @ManyToOne(() => Task, { eager: true })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => InputValueType, { eager: true })
  @JoinColumn({ name: 'inputValueTypeId' })
  inputValueType: InputValueType;

  @Column({ type: 'varchar' })
  taskInputValue: string;

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
