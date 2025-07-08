import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index(['personId', 'isDefault'])
@Entity('payment_method', { schema: process.env.TIDB_DATABASE })
export class PaymentMethod extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  paymentMethodId: string;

  @Column('uuid', { nullable: true })
  personId?: string;

  @Column()
  externalId: string;

  @Column({ length: 20 })
  type: 'CARD' | 'ACH' | 'APPLE_PAY' | 'GOOGLE_PAY' | 'OTHER';

  @Column('json', { nullable: true })
  details?: Record<string, unknown>;

  @Column('boolean', { default: false })
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
