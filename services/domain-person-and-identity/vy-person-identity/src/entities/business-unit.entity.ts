import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Operator } from './operator.entity';

@Entity('business_units', { schema: process.env.TIDB_DATABASE })
export class BusinessUnit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  businessUnitId: string;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  name: string;

  @ManyToOne(() => BusinessUnit, (businessUnit) => businessUnit.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentBusinessUnitId' })
  parentBusinessUnit: BusinessUnit;

  @Column('uuid', { nullable: true })
  parentBusinessUnitId: string;

  @OneToMany(
    () => BusinessUnit,
    (businessUnit) => businessUnit.parentBusinessUnit,
  )
  children: BusinessUnit[];

  @OneToMany(() => Operator, (op) => op.businessUnit)
  operators: Operator[];

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
