import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { TaskHasReceiveInputValueOfType } from './task-has-received-input-value-of-type.entity';
import { TaskTypesReceiveInputValueType } from './task-types-receive-input-value-type.entity';

@Entity('input_value_types', { schema: process.env.TIDB_DATABASE })
export class InputValueType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  inputValueTypeId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  // Establish a one-to-many relationship to TaskTypeReceivesInputValueType
  @OneToMany(
    () => TaskTypesReceiveInputValueType,
    (taskTypeReceiveInputValueType) => taskTypeReceiveInputValueType.taskType,
  )
  taskTypesReceiveInputValueTypes: TaskTypesReceiveInputValueType[];

  // Establish a many-to-one relationship to TaskTypeReceivesInputValueType
  @ManyToOne(
    () => TaskTypesReceiveInputValueType,
    (taskTypeReceivesInputValueType) =>
      taskTypeReceivesInputValueType.inputValueType,
  )
  taskTypeReceivesInputValueType: TaskTypesReceiveInputValueType;

  @OneToMany(
    () => TaskHasReceiveInputValueOfType,
    (taskHasReceiveInputValueOfType) =>
      taskHasReceiveInputValueOfType.inputValueType,
  )
  taskHasReceiveInputValuesOfType: TaskHasReceiveInputValueOfType[];

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
