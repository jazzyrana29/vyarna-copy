import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Index(['accountId', 'createdAt'])
@Entity('ledger_transaction', { schema: process.env.TIDB_DATABASE })
export class LedgerTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  transactionId: string;

  @Column('uuid')
  accountId: string;

  @Column('bigint')
  amountCents: number;

  @Column({ type: 'varchar', length: 20 })
  transactionType: 'PAYOUT' | 'REWARD' | 'COMMISSION' | 'REFUND' | 'ADJUSTMENT';

  @Column({ type: 'varchar', length: 30, nullable: true })
  relatedType?: string;

  @Column('uuid', { nullable: true })
  relatedId?: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 10 })
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
