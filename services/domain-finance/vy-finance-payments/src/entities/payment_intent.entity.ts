import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

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

  @Column({ length: 30 })
  status: string;

  @Column('json', { nullable: true })
  metadata?: Record<string, unknown>;
}
