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
import { WaveExecutesTaskIntoStatus } from './wave-executes-task-into-status.entity'; // Adjust the import path as necessary
import { Task } from './task.entity';

@Entity('task_statuses', { schema: process.env.TIDB_DATABASE })
export class TaskStatus extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  taskStatusId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  // Establish a one-to-many relationship to WaveExecutesTaskIntoStatus
  @OneToMany(
    () => WaveExecutesTaskIntoStatus,
    (waveExecutesTaskIntoStatus) => waveExecutesTaskIntoStatus.taskStatusId,
  )
  wavesExecutesTasksIntoStatuses: WaveExecutesTaskIntoStatus[];

  // Establish a many-to-one relationship to WaveExecutesTaskIntoStatus
  @ManyToOne(
    () => WaveExecutesTaskIntoStatus,
    (waveExecutesOneTasksIntoOneStatus) =>
      waveExecutesOneTasksIntoOneStatus.taskStatus,
  )
  waveExecutesOneTasksIntoOneStatus: WaveExecutesTaskIntoStatus;

  @OneToMany(() => Task, (task) => task.taskStatus)
  tasks: Task[];

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
