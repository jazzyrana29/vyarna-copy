import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ztracking_operator_sessions', { schema: process.env.TIDB_DATABASE })
export class ZtrackingOperatorSession extends BaseEntity {
  @Column({ type: 'uuid', nullable: false })
  deviceSessionId: string;

  @Column({ type: 'uuid', nullable: false })
  operatorId: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @CreateDateColumn()
  loginTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  logoutTime: Date | null;

  @Column({ type: 'uuid', nullable: false })
  operatorSessionId: string;

  @PrimaryGeneratedColumn()
  ztrackingVersion: string;

  @CreateDateColumn()
  versionDate: Date;
}
