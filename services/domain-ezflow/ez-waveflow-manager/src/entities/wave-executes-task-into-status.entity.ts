import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './task-status.entity'; // Adjust the import path as necessary

@Entity('wave_executes_task_into_status', { schema: process.env.TIDB_DATABASE })
export class WaveExecutesTaskIntoStatus extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  taskStatusId: string;

  @ManyToOne(
    () => TaskStatus,
    (taskStatus) => taskStatus.wavesExecutesTasksIntoStatuses,
  )
  taskStatus: TaskStatus;
}
