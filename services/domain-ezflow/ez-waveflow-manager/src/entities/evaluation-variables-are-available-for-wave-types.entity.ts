import {
  Entity,
  ManyToOne,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { WaveType } from './wave-type.entity';
import { EnvironmentalVariable } from './environmental-variable.entity';

@Entity('evaluation_variables_are_available_for_wave_types', {
  schema: process.env.TIDB_DATABASE,
})
export class EvaluationVariablesAreAvailableForWaveTypes extends BaseEntity {
  @PrimaryColumn('uuid')
  waveTypeId: string;

  @PrimaryColumn('uuid')
  environmentalVariableId: string;

  @ManyToOne(() => WaveType, { eager: true })
  @JoinColumn({ name: 'waveTypeId' })
  waveType: WaveType;

  @ManyToOne(() => EnvironmentalVariable, { eager: true })
  @JoinColumn({ name: 'environmentalVariableId' })
  environmentalVariable: EnvironmentalVariable;

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
