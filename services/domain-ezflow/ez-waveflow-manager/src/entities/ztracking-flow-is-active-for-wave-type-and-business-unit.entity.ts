// ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit.ts

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_flow_is_active_for_wave_type_and_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingFlowIsActiveForWaveTypeAndBusinessUnit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column('uuid', { nullable: true })
  flowId: string;

  @Column('uuid', { nullable: true })
  waveTypeId: string;

  @Column('uuid', { nullable: true })
  businessUnitId: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
