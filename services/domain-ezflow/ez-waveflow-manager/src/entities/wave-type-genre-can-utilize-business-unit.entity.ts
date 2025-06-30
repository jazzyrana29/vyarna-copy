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
import { WaveTypeGenre } from './wave-type-genre.entity';

@Entity('wave_type_genre_can_utilize_to_business_unit', {
  schema: process.env.TIDB_DATABASE,
})
export class WaveTypeGenreCanUtilizeBusinessUnit extends BaseEntity {
  @PrimaryColumn('uuid')
  waveTypeGenreId: string;

  @PrimaryColumn('uuid')
  businessUnitId: string;

  @ManyToOne(
    () => WaveTypeGenre,
    (waveTypeGenre) => waveTypeGenre.utilizedBusinessUnits,
    { nullable: false },
  )
  @JoinColumn({
    name: 'waveTypeGenreId',
    referencedColumnName: 'waveTypeGenreId',
  })
  waveTypeGenre: WaveTypeGenre;

  @Column()
  isActive: boolean;

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
