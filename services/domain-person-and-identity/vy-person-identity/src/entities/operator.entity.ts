import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessUnit } from './business-unit.entity';

@Entity('operators', { schema: process.env.TIDB_DATABASE })
@Index(['username', 'rootBusinessUnitId'], { unique: true })
@Index(['email'], { unique: true })
export class Operator extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  operatorId: string;

  @Column('uuid', { nullable: true })
  @Index()
  businessUnitId?: string;

  @ManyToOne(() => BusinessUnit, (bu) => bu.children, { nullable: true })
  @JoinColumn({ name: 'businessUnitId' })
  businessUnit?: BusinessUnit;

  @Column('uuid', { nullable: true })
  rootBusinessUnitId?: string;

  @ManyToOne(() => BusinessUnit, (bu) => bu.children, { nullable: true })
  @JoinColumn({ name: 'rootBusinessUnitId' })
  rootBusinessUnit?: BusinessUnit;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 50 })
  nameFirst: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nameMiddle: string;

  @Column({ type: 'varchar', length: 50 })
  nameLast: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

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
