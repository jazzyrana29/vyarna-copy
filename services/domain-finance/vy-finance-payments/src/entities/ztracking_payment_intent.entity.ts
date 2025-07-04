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
  @Column('uuid')
  paymentIntentId: string;

  @Column({ unique: true })
  externalId: string;

  @Column('int')
  amountCents: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ length: 30 })
  status: string;

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

  @Column()
  versionDate: Date;
}
