// Flow.ts

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
import { Wave } from './wave.entity';

import { Node } from './node.entity';
import { FlowIsActiveForWaveTypeAndBusinessUnit } from './flow-is-active-for-wave-type-and-business-unit.entity';

@Entity('flows', { schema: process.env.TIDB_DATABASE })
export class Flow extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  flowId: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  @Column('uuid', { nullable: true })
  businessUnitId: string;

  // Many-to-One relationship with WaveType
  @ManyToOne(() => WaveType, (waveType) => waveType.flows)
  @JoinColumn({ name: 'waveTypeId' })
  waveType: WaveType;

  @OneToMany(
    () => FlowIsActiveForWaveTypeAndBusinessUnit,
    (relation) => relation.activeFlow,
  )
  flowIsActiveForWaveTypeAndBusinessUnits: FlowIsActiveForWaveTypeAndBusinessUnit[];

  @OneToMany(() => Node, (node) => node.flow)
  nodes: Node[];

  @Column('uuid')
  waveTypeId: string;

  // One-to-Many relationship with Waves
  @OneToMany(() => Wave, (wave) => wave.executionFlow)
  waves: Wave[];

  @Column({ type: 'text', nullable: true })
  variables?: string;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ default: false })
  @Index()
  isPublished: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
