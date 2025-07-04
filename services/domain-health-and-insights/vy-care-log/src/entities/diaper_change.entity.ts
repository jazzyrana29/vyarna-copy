import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('diaper_change', { schema: process.env.TIDB_DATABASE })
export class DiaperChange extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
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

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
