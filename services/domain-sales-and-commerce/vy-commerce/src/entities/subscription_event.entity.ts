import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscription_event', { schema: process.env.TIDB_DATABASE })
@Index(['subscriptionId', 'eventTime'])
export class SubscriptionEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  eventId: string;

  @Column('uuid')
  subscriptionId: string;

  @Column({ length: 20 })
  eventType: 'RENEWAL' | 'PAYMENT_FAILED' | 'CANCELLATION';

  @Column('timestamp')
  eventTime: Date;

  @Column('json')
  payload: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
