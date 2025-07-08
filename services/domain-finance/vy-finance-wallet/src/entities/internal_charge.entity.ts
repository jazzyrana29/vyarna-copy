import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('internal_charge', { schema: process.env.TIDB_DATABASE })
export class InternalCharge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  chargeId: string;

  @Column('uuid')
  accountId: string;

  @Column('bigint')
  amountCents: number;

  @Column('text')
  description: string;

  @Column('timestamp')
  chargeTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
