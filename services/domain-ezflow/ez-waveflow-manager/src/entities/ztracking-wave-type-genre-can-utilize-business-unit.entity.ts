import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ztracking_wave_type_genre_can_utilize_to_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class ZtrackingWaveTypeGenreCanUtilizeBusinessUnit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Column('uuid')
  waveTypeGenreId: string;

  @Column('uuid')
  businessUnitId: string;

  @Column()
  isActive: boolean;

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
