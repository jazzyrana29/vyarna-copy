import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Index(['providerId', 'periodStart'])
@Entity('provider_payout', { schema: process.env.TIDB_DATABASE })
export class ProviderPayout extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  payoutId: string;

  @Column('uuid')
  providerId: string;

  @Column('uuid')
  accountId: string;

  @Column('date')
  periodStart: string;

  @Column('date')
  periodEnd: string;

  @Column('bigint')
  amountCents: number;

  @Column({ type: 'varchar', length: 20 })
  status: 'SCHEDULED' | 'PROCESSING' | 'PAID' | 'FAILED';

  @Column('timestamp')
  scheduledAt: Date;

  @Column('timestamp', { nullable: true })
  paidAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
