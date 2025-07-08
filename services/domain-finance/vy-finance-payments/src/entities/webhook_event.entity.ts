import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index(['gateway', 'externalEventId'], { unique: true })
@Entity('webhook_event', { schema: process.env.TIDB_DATABASE })
export class WebhookEvent extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  webhookId: string;

  @Column({ length: 20 })
  gateway: 'STRIPE' | 'PAYPAL' | 'OTHER';

  @Column()
  externalEventId: string;

  @Column()
  eventType: string;

  @Column('json')
  payload: Record<string, unknown>;

  @Column({ length: 20 })
  status: 'PENDING' | 'PROCESSED' | 'FAILED';

  @CreateDateColumn()
  receivedAt: Date;

  @Column('timestamp', { nullable: true })
  processedAt?: Date;
}
