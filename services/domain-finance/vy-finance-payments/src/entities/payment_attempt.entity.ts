import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_attempt', { schema: process.env.TIDB_DATABASE })
@Index(['paymentIntentId', 'attemptNumber'], { unique: true })
export class PaymentAttempt extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  attemptId: string;

  @Column('uuid')
  paymentIntentId: string;

  @Column('int')
  attemptNumber: number;

  @Column({ length: 10 })
  status: 'PENDING' | 'SUCCESS' | 'FAILED';

  @Column({ length: 50, nullable: true })
  errorCode?: string;

  @Column('text', { nullable: true })
  errorMessage?: string;

  @Column('json', { nullable: true })
  gatewayResponse?: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
