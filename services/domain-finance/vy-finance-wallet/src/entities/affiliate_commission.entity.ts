import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Index(['partnerId', 'status'])
@Entity('affiliate_commission', { schema: process.env.TIDB_DATABASE })
export class AffiliateCommission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  commissionId: string;

  @Column('uuid')
  partnerId: string;

  @Column('uuid')
  accountId: string;

  @Column('uuid')
  orderId: string;

  @Column('bigint')
  amountCents: number;

  @Column({ type: 'varchar', length: 20 })
  status: 'PENDING' | 'PAID' | 'FAILED';

  @Column('timestamp')
  earnedAt: Date;

  @Column('timestamp', { nullable: true })
  paidAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
