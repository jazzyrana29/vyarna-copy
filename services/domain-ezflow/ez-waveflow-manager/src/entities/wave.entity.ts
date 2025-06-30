import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WaveType } from './wave-type.entity';
import { Task } from './task.entity';
import { Flow } from './flow.entity';

@Entity('waves', { schema: process.env.TIDB_DATABASE })
export class Wave extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  waveId: string;

  @ManyToOne(() => WaveType, { eager: true })
  @JoinColumn({ name: 'waveTypeId' })
  waveType: WaveType;

  @Column('uuid', { nullable: true })
  waveTypeId: string;

  @OneToMany(() => Task, (task) => task.wave)
  tasks: Task[];

  @ManyToOne(() => Flow)
  @JoinColumn({ name: 'executionFlowId' })
  executionFlow: Flow;

  @Column('uuid')
  executionFlowId: string;

  @Column({ type: 'timestamp', nullable: true })
  executionStartDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  executionEndDate: Date;

  @Column({ type: 'varchar', length: 50 })
  waveStatus: 'InExecution' | 'FailedWithError' | 'Completed';

  @Column({ type: 'json', nullable: true })
  returnVariables?: Record<string, unknown>;

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
