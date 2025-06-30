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
import { NodeExit } from './node-exit.entity'; // Adjust the import path as necessary

@Entity('node_exit_types', { schema: process.env.TIDB_DATABASE })
export class NodeExitType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  nodeExitTypeId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  // Establish a one-to-many relationship to NodeExit
  @OneToMany(() => NodeExit, (nodeExit) => nodeExit.nodeExitType)
  nodeExits: NodeExit[];

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
