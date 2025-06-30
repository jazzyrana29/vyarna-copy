import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_filters', { schema: process.env.TIDB_DATABASE })
export class ZtrackingFilter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  filterId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  filterName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  filterDescription: string;

  @Column({ nullable: true })
  isActive: boolean;

  @Column({ type: 'int', nullable: true })
  manifoldOrder: number;

  @Column('uuid', { nullable: true })
  manifoldId: string;

  @Column('uuid', { nullable: true })
  nodeExitId: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
