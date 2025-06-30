import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  Index,
  PrimaryColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InputValueType } from './input-value-type.entity';
import { TaskType } from './task-type.entity';

@Entity('task_types_receive_input_value_types', {
  schema: process.env.TIDB_DATABASE,
})
export class TaskTypesReceiveInputValueType extends BaseEntity {
  @PrimaryColumn('uuid')
  taskTypeId: string;

  @PrimaryColumn('uuid')
  inputValueTypeId: string;

  @ManyToOne(() => TaskType, { eager: true })
  @JoinColumn({ name: 'taskTypeId' })
  taskType: TaskType;

  @ManyToOne(() => InputValueType, { eager: true })
  @JoinColumn({ name: 'inputValueTypeId' })
  inputValueType: InputValueType;

  @Column({ type: 'boolean' })
  isAvailable: boolean;

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
