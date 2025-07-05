import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('wallet_account', { schema: process.env.TIDB_DATABASE })
export class WalletAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  accountId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 20 })
  type: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';

  @Column({ length: 3 })
  currency: string;

  @Column('bigint', { default: 0 })
  balanceCents: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
