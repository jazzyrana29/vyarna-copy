import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_intent', { schema: process.env.TIDB_DATABASE })
export class PaymentIntent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  paymentIntentId: string;

  @Column({ unique: true })
  externalId: string;

  @Column('int')
  amountCents: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ length: 255, nullable: true })
  customerExternalId?: string;

  @Column({ length: 30 })
  status:
    | 'REQUIRES_PAYMENT_METHOD'
    | 'REQUIRES_CONFIRMATION'
    | 'PROCESSING'
    | 'SUCCEEDED'
    | 'REQUIRES_ACTION'
    | 'FAILED'
    | 'CANCELED';

  @Column('json', { nullable: true })
  metadata?: Record<string, unknown>;

  @Column('uuid', { nullable: true })
  orderId?: string;

  @Column('uuid', { nullable: true })
  subscriptionId?: string;

  @Column('timestamp', { nullable: true })
  nextRetryAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
