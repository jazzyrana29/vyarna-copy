import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_diaper_change', { schema: process.env.TIDB_DATABASE })
export class ZtrackingDiaperChange extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  diaperChangeId: string;

  @Column('uuid')
  babyId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 6 })
  changeType: 'WET' | 'SOILED' | 'BOTH';

  @Column('timestamp')
  eventTime: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  pooTexture?:
    | 'VERY_RUNNY'
    | 'RUNNY'
    | 'MUSHY'
    | 'MUCOUSY'
    | 'SOLID'
    | 'LITTLE_BALLS';

  @Column({ type: 'varchar', length: 10, nullable: true })
  pooColor?: 'GREEN' | 'YELLOW' | 'BROWN' | 'BLACK' | 'RED' | 'WHITE';

  @Column('text', { nullable: true })
  photoUrl?: string;

  @Column('text', { nullable: true })
  notes?: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column()
  versionDate: Date;
}
