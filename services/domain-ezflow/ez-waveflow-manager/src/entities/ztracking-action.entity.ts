import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_actions', { schema: process.env.TIDB_DATABASE })
export class ZtrackingAction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid', { nullable: true })
  actionId?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index()
  actionType?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Index()
  isDeleted?: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Index()
  @Column({ nullable: true })
  versionDate?: Date;
}
