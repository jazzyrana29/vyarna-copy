import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('wallet_account', { schema: process.env.TIDB_DATABASE })
export class WalletAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  accountId: string;

  @Column('uuid')
  personId: string;

  @Column('int', { default: 0 })
  balanceCents: number;
}
