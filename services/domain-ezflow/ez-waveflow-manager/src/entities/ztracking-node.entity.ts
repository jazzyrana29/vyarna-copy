// ZtrackingNode.ts

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_nodes', { schema: process.env.TIDB_DATABASE })
export class ZtrackingNode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  nodeId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Index()
  name: string;

  @Column({ type: 'float', nullable: true })
  positionX: number;

  @Column({ type: 'float', nullable: true })
  positionY: number;

  @Column('uuid', { nullable: true })
  flowId: string;

  @Column('uuid', { nullable: true })
  nodeTypeId: string;

  @Column({ default: false, nullable: true })
  @Index()
  isDeleted: boolean;

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @Index()
  @Column()
  versionDate: Date;
}
