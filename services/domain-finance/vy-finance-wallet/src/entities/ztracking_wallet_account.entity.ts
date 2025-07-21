import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('ztracking_wallet_account', { schema: process.env.TIDB_DATABASE })
export class ZtrackingWalletAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid', { nullable: true })
  accountId?: string;

  @Column('uuid', { nullable: true })
  personId?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  type?: 'PROVIDER' | 'CONSUMER' | 'AFFILIATE' | 'INTERNAL';

  @Column({ length: 3, nullable: true })
  currency?: string;

  @Column('bigint', { nullable: true })
  balanceCents?: number;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  versionDate?: Date;
}
