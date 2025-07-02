import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DeviceSession } from './device-session.entity';
import { Operator } from './operator.entity';

@Entity('operator_sessions', { schema: process.env.TIDB_DATABASE })
export class OperatorSession extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  operatorSessionId: string;

  @ManyToOne(
    () => DeviceSession,
    (deviceSession) => deviceSession.operatorSessions,
    { onDelete: 'CASCADE' },
  )
  deviceSession: DeviceSession;

  @ManyToOne(() => Operator, (operator) => operator.operatorId)
  operator: Operator;

  @Column({ nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  loginTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  logoutTime: Date | null;
}
