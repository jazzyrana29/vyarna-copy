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
import { WaveTypeGenre } from './wave-type-genre.entity';
import { Wave } from './wave.entity';
import { Flow } from './flow.entity';
import { FlowIsActiveForWaveTypeAndBusinessUnit } from './flow-is-active-for-wave-type-and-business-unit.entity';
import { EvaluationVariablesAreAvailableForWaveTypes } from './evaluation-variables-are-available-for-wave-types.entity';
import { WaveTypeIsAllowedToAccessBusinessUnit } from './wave-type-is-allowed-to-access-business-unit.entity';

@Entity('wave_types', { schema: process.env.TIDB_DATABASE })
export class WaveType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  waveTypeId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  // Establish a one-to-many relationship to Wave
  @OneToMany(() => Wave, (wave) => wave.waveId)
  waves: Wave[];

  // Establish a many-to-one relationship to WaveTypeGenre
  @ManyToOne(() => WaveTypeGenre, (waveTypeGenre) => waveTypeGenre.waveTypes)
  @JoinColumn({ name: 'waveTypeGenreId' })
  waveTypeGenre: WaveTypeGenre;

  @Column('uuid')
  waveTypeGenreId: string;

  // One-to-Many relationship with Flows
  @OneToMany(() => Flow, (flow) => flow.waveType)
  flows: Flow[];

  @OneToMany(
    () => FlowIsActiveForWaveTypeAndBusinessUnit,
    (relation) => relation.waveType,
  )
  flowIsActiveForWaveTypeAndBusinessUnits: FlowIsActiveForWaveTypeAndBusinessUnit[];

  @OneToMany(
    () => EvaluationVariablesAreAvailableForWaveTypes,
    (relation) => relation.waveType,
  )
  evaluationVariablesAreAvailableForWaveTypes: EvaluationVariablesAreAvailableForWaveTypes[];

  @OneToMany(
    () => WaveTypeIsAllowedToAccessBusinessUnit,
    (waveTypeIsAllowedToAccessBusinessUnit) =>
      waveTypeIsAllowedToAccessBusinessUnit.waveType,
  )
  allowedBusinessUnits: WaveTypeIsAllowedToAccessBusinessUnit[];

  @Column({ type: 'text', nullable: true })
  inputSchema?: string;

  @Column({ type: 'text', nullable: true })
  outputSchema?: string;

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
