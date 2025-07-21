import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('ztracking_payment_intent', { schema: process.env.TIDB_DATABASE })
export class ZtrackingPaymentIntent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  ztrackingVersion: string;

  @Index()
  @Column('uuid', { nullable: true })
  paymentIntentId?: string;

  @Column({ nullable: true })
  externalId?: string;

  @Column('int', { nullable: true })
  amountCents?: number;

  @Column({ length: 3, nullable: true })
  currency?: string;

  @Column({ length: 30, nullable: true })
  status?: string;

  @Column('json', { nullable: true })
  metadata?: Record<string, unknown>;

  @Column('uuid', { nullable: true })
  orderId?: string;

  @Column('uuid', { nullable: true })
  subscriptionId?: string;

  @Column('timestamp', { nullable: true })
  nextRetryAt?: Date;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  versionDate?: Date;
}
