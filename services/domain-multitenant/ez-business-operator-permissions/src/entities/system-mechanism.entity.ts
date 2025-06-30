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
import { MechanismPermit } from './mechanism-permit.entity';

@Entity('system_mechanisms', { schema: process.env.TIDB_DATABASE })
export class SystemMechanism extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  systemMechanismId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @Column({ type: 'varchar', length: 500 })
  @Index()
  description: string;

  @OneToMany(
    () => MechanismPermit,
    (mechanismPermit) => mechanismPermit.systemMechanismId,
  )
  mechanismPermits: MechanismPermit[];

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
