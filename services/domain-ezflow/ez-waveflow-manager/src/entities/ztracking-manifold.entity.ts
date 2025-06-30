import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_manifolds', { schema: process.env.TIDB_DATABASE })
export class ZtrackingManifold extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  manifoldId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  executionStyle: string;

  @Column({ default: false, nullable: true })
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
