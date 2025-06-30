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
import { WaveType } from './wave-type.entity';

@Entity('wave_type_is_allowed_to_access_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class WaveTypeIsAllowedToAccessBusinessUnit extends BaseEntity {
  @PrimaryColumn('uuid')
  waveTypeId: string;

  @PrimaryColumn('uuid')
  businessUnitId: string;

  @ManyToOne(() => WaveType, (waveType) => waveType.allowedBusinessUnits, {
    nullable: false,
  })
  @JoinColumn({ name: 'waveTypeId', referencedColumnName: 'waveTypeId' })
  waveType: WaveType;

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
