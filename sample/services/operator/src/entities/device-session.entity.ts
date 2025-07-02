import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OperatorSession } from './operator-session.entity';

@Entity('device_sessions', { schema: process.env.TIDB_DATABASE })
export class DeviceSession {
  @PrimaryGeneratedColumn('uuid')
  deviceSessionId: string;

  @CreateDateColumn()
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  userAgent: string;

  @UpdateDateColumn()
  lastUpdated: Date;

  @OneToMany(
    () => OperatorSession,
    (operatorSession) => operatorSession.operatorSessionId,
  )
  operatorSessions: OperatorSession[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceId: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
