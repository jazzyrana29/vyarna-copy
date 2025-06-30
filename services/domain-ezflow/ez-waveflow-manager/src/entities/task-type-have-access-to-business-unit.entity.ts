import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskType } from './task-type.entity';

@Entity('task_type_have_access_to_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class TaskTypeHaveAccessToBusinessUnit extends BaseEntity {
  @PrimaryColumn('uuid')
  taskTypeId: string;

  @PrimaryColumn('uuid')
  businessUnitId: string;

  @ManyToOne(() => TaskType, (taskType) => taskType.accessibleBusinessUnits, {
    nullable: false,
  })
  @JoinColumn({ name: 'taskTypeId', referencedColumnName: 'taskTypeId' })
  taskType: TaskType;

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
