// FlowIsActiveForWaveTypeAndBusinessUnit.ts

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Flow } from './flow.entity';
import { WaveType } from './wave-type.entity';

@Entity('flow_is_active_for_wave_type_and_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class FlowIsActiveForWaveTypeAndBusinessUnit extends BaseEntity {
  @PrimaryColumn('uuid')
  waveTypeId: string;

  @PrimaryColumn('uuid')
  businessUnitId: string;

  @Column('uuid', { nullable: false })
  @Index()
  activeFlowId: string;

  // Active Flow for this WaveType
  @ManyToOne(() => Flow, (flow) => flow.flowIsActiveForWaveTypeAndBusinessUnits)
  @JoinColumn({ name: 'activeFlowId' })
  activeFlow: Flow;

  @ManyToOne(() => WaveType)
  @JoinColumn({ name: 'waveTypeId' })
  waveType: WaveType;

  @Column({ default: false })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
