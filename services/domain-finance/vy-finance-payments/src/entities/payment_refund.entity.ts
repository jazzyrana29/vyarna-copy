import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_refund', { schema: process.env.TIDB_DATABASE })
export class PaymentRefund extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  refundId: string;

  @Column('uuid')
  paymentIntentId: string;

  @Column({ unique: true })
  externalId: string;

  @Column('int')
  amountCents: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ length: 30 })
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED';

  @Column({ length: 30, nullable: true })
  reason?: 'REQUESTED_BY_CUSTOMER' | 'FRAUD' | 'OTHER';

  @Column('json', { nullable: true })
  metadata?: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
