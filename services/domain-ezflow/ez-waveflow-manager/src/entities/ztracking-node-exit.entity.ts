// ZtrackingNodeExit.ts

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_node_exits', { schema: process.env.TIDB_DATABASE })
export class ZtrackingNodeExit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  nodeExitId: string;

  @Column('uuid', { nullable: true })
  sourceNodeId: string;

  @Column('uuid', { nullable: true })
  targetNodeId: string;

  @Column('uuid', { nullable: true })
  nodeExitTypeId: string;

  @Column('uuid', { nullable: true })
  filterId: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
