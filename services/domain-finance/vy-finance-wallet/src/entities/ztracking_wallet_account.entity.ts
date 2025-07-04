import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_wallet_account', { schema: process.env.TIDB_DATABASE })
export class ZtrackingWalletAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid')
  accountId: string;

  @Column('uuid')
  personId: string;

  @Column({ type: 'varchar', length: 20 })
  type: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';

  @Column({ length: 3 })
  currency: string;

  @Column('bigint', { default: 0 })
  balanceCents: number;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column()
  versionDate: Date;
}
