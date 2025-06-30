import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WaveType } from './wave-type.entity';
import { WaveTypeGenreCanUtilizeBusinessUnit } from './wave-type-genre-can-utilize-business-unit.entity'; // Ensure that UUID from 'class-validator' is used correctly

@Entity('wave_type_genres', { schema: process.env.TIDB_DATABASE })
export class WaveTypeGenre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  waveTypeGenreId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  @OneToMany(() => WaveType, (waveType) => waveType.waveTypeGenre)
  waveTypes: WaveType[];

  @OneToMany(
    () => WaveTypeGenreCanUtilizeBusinessUnit,
    (waveTypeGenreCanUtilizeBusinessUnit) =>
      waveTypeGenreCanUtilizeBusinessUnit.waveTypeGenre,
  )
  utilizedBusinessUnits: WaveTypeGenreCanUtilizeBusinessUnit[];

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
