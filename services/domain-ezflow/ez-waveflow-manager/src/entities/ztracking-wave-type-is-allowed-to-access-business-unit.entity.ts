import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ztracking_wave_type_is_allowed_to_access_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingWaveTypeIsAllowedToAccessBusinessUnit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column('uuid')
  waveTypeId: string;

  @Column('uuid')
  businessUnitId: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Index()
  @Column()
  versionDate: Date;
}
